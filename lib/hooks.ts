import { auth, firestore } from '@lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import type { Dispatch } from 'redux'
import { setUser, setUsername } from '@features/user/userSlice'
import { RootState } from '@features/store'
import { useSelector } from 'react-redux'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Interval } from '@models/Interval'
import type firebase from 'firebase/app'

export const fetchUserData = (dispatch: Dispatch) => {
  const [user] = useAuthState(auth)

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe
    if (user) {
      const { uid, displayName, photoURL } = user
      dispatch(setUser({ uid, displayName, photoURL }))
      const ref = firestore.collection('users').doc(user.uid)
      unsubscribe = ref.onSnapshot((doc) => {
        dispatch(setUsername(doc.data()?.username))
      })
    } else {
      dispatch(setUser(null))
      dispatch(setUsername(null))
    }
    return unsubscribe
  }, [user])
}

export const useUserData = () => {
  const userData = useSelector((state: RootState) => state.userData)
  return userData
}

export const useUserIntervals = (
  userId?: string,
): {
  intervals: Interval[]
  intervalsRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> | null
} => {
  if (!userId) {
    return { intervals: [], intervalsRef: null }
  }
  const startOfToday = new Date().setHours(0, 0, 0, 0)
  const intervalsRef = firestore.collection('users').doc(userId).collection('intervals')
  const query = intervalsRef.where('startedAt', '>', startOfToday).orderBy('startedAt')
  const [intervals, loadingIntervals, error] = useCollectionData<Interval>(query, { idField: 'id' })
  return { intervals: intervals ? intervals : [], intervalsRef }
}
