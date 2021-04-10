import { IntervalStats } from '@features/dashboard/IntervalStats'
import { firestore } from '@lib/firebase'
import { useRouter } from 'next/router'
import React from 'react'
import { useDocument, useDocumentDataOnce } from 'react-firebase-hooks/firestore'

export default function ProfilePage({}) {
  const router = useRouter()
  const { username } = router.query
  if (!username) return <p>404</p>

  const usernamesRef = firestore.collection('usernames').doc(username as string)
  const [usernameObject] = useDocumentDataOnce(usernamesRef)

  if (!usernameObject) {
    return <p>Loading...</p>
  }

  return (
    <main>
      <IntervalStats userId={usernameObject.uid} />
    </main>
  )
}
