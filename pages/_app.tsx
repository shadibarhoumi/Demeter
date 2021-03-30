import '@styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { Navbar } from '@components/Navbar'
import { Provider } from 'react-redux'
import { useStore } from 'features/store'
import React from 'react'
import { fetchUserData } from '@lib/hooks'

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  fetchUserData(store.dispatch)

  return (
    <Provider store={store}>
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
