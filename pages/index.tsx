import Head from 'next/head'
import styles from '@styles/Home.module.css'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { useUserData } from '@lib/hooks'

export default function Home() {
  const { user } = useUserData()
  return (
    <div className={styles.container}>
      <Head>
        <title>StickyTime</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.productName}>StickyTime</span>
        </h1>

        <p className={styles.description}>A tool to help you put the hours in and reach your potential.</p>

        <Link href={user ? '/timer' : '/enter'}>
          <Button
            colorScheme="teal"
            size="lg"
            style={{
              marginTop: '15px',
            }}
          >
            💪 Let's Do This!
          </Button>
        </Link>
      </main>

      <footer className={styles.footer}>
        <p>An SBWX Creation</p>
      </footer>
    </div>
  )
}
