import axios from "axios"
import settings from "../settings.json"
import { doLogOut } from "../slices/auth"

const http = axios.create({
  baseURL: settings.API_URL
})

/**
 * Log out on Unauthorized request
 */
export const setupInterceptors = dispatch => {
  http.interceptors.response.use(undefined, error => {
    const status = error.response.status
    if ([401, 403].includes(status)) {
      console.error(error.response.data)
      dispatch(doLogOut())
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

export default http
