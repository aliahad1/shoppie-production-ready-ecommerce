import '../styles/globals.scss'
import Head from 'next/head'
import { Provider } from 'react-redux'
import store from '../store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store)

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Shoppie</title>
        <meta name="description" content="Online shopping service" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  )
}
