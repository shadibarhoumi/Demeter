import React from 'react'
import { auth } from '../src/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'
import { Button } from '@chakra-ui/react'
import firebase from 'firebase'

export default function LoginPage() {
  const [user] = useAuthState(auth)
  const router = useRouter()
  React.useEffect(() => {
    if (user) {
      router.push('/app')
    }
  }, [user])

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  console.log({ user })
  return (
    <div>
      <Button colorScheme="teal" size="md" onClick={signInWithGoogle}>
        Sign In With Google
      </Button>
    </div>
  )
}
