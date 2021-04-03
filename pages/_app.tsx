import '@styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { useStore } from 'features/store'
import React from 'react'
import { fetchUserData } from '@lib/hooks'
import Page from '@components/Page'

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  fetchUserData(store.dispatch)

  return (
    <Provider store={store}>
      <ChakraProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
        <Toaster />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
