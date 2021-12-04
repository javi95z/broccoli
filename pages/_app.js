import Head from "next/head"
import { configureStore } from "@reduxjs/toolkit"
import { useTranslation } from "react-i18next"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"
import rootReducer from "../slices"
import { Container } from "../components/layout"
import { Init, Interceptors } from "../providers"
import "tailwindcss/tailwind.css"
import "../translations/i18n"
import "../styles/index.css"

const store = configureStore({ reducer: rootReducer })

const App = ({ Component, pageProps }) => {
  const [t] = useTranslation()

  return (
    <div>
      <Head>
        <title>Broccoli</title>
        <meta name="description" content={t("app.description")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Provider store={store}>
        <Interceptors />
        <Init />
        <Container>
          <Component {...pageProps} />
        </Container>
      </Provider>

      <ToastContainer
        autoClose={5000}
        closeButton={false}
        limit={5}
        closeOnClick
        draggable
        pauseOnHover
      />
      <div id="modal-root"></div>
    </div>
  )
}

export default App
