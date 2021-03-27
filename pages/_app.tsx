import '@styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { Navbar } from '@components/Navbar'
import { UserContext } from '@lib/context'
import { useUserData } from '@lib/hooks'

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData()
  return (
    <UserContext.Provider value={userData}>
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </ChakraProvider>
    </UserContext.Provider>
  )
}

export default MyApp
