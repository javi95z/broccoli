import axios from "axios"
import Router from "next/router"
import { logOutSuccess } from "../slices/auth"
import { clearHoldings } from "../slices/holdings"
import { clearPortfolio } from "../slices/portfolio"
import { clearTransactions } from "../slices/transactions"
import settings from "../settings.json"

const http = axios.create({
  baseURL: "/api"
})

/**
 * Set up request and response interceptors
 */
export const setupInterceptors = dispatch => {
  http.interceptors.response.use(undefined, error => {
    const status = error.response.status
    if ([401, 403].includes(status)) {
      console.error(error.response.data)
      doLogout(dispatch)
    }
    return Promise.reject(error)
  })

  http.interceptors.request.use(
    config => {
      const user = localStorage.getItem("user")
      if (user) {
        const { token } = JSON.parse(user)
        config.headers.Authorization = token ? `Bearer ${token}` : ""
      }
      return config
    },
    error => Promise.reject(error)
  )
}

const doLogout = async dispatch => {
  const route = settings.API_ROUTES.LOG_OUT
  await http.put(route)
  dispatch(logOutSuccess())
  localStorage.removeItem("user")
  dispatch(clearHoldings())
  dispatch(clearPortfolio())
  dispatch(clearTransactions())
  Router.replace(settings.ROUTES.ROOT)
}

export default http
