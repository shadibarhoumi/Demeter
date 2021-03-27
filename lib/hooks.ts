import { auth, firestore } from '@lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState, useRef } from 'react'

export const useUserData = () => {
  const [user] = useAuthState(auth)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe
    if (user) {
      const ref = firestore.collection('users').doc(user.uid)
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username)
      })
    } else {
      setUsername(null)
    }
    return unsubscribe
  }, [user])

  return { user, username }
}

export function usePrevious<T>(value: T) {
  const prevRef = useRef<T>()
  useEffect(() => {
    prevRef.current = value
  }, [value])
  return prevRef.current
}
