import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '@d/store'

const store = configureStore({
  reducer: rootReducer,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
