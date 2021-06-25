import Head from 'next/head'
import styles from '@styles/Home.module.css'
import { useUserData } from '@lib/hooks'
import React from 'react'
import { ThreeDButton } from '@components/ThreeDButton'
import { auth, googleAuthProvider } from '@lib/firebase'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

const GoButton = () => {
  const { user, username } = useUserData()
  const router = useRouter()
  const signInWithGoogle = async () => {
    try {
      if (!user) {
        await auth.signInWithPopup(googleAuthProvider)
      }
      router.push('/timer')
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error('An error occurred: ' + error.message)
      }
    }
  }

  return (
    <button onClick={signInWithGoogle}>
      <ThreeDButton
        style={{
          marginTop: '15px',
        }}
      >
        Try It Now
      </ThreeDButton>
    </button>
  )
}

export default function Home() {
  return (
    <>
      <Head>
        <title>SpaceTime</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>SpaceTime</h1>

        <p className={styles.description}>Spend your time the way you want to.</p>

        <GoButton />
      </main>
    </>
  )
}
