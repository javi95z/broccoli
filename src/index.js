import React from "react"
import { render } from "react-dom"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import "tailwindcss/tailwind.css"
import rootReducer from "./slices"
import App from "./App"
import "./translations/i18n"
import "./styles/index.css"

const store = configureStore({ reducer: rootReducer })

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
