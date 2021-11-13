import { useSelector } from "react-redux"
import http from "../http"
import { AxiosInstance } from "axios"

/**
 * @returns {{
 * http: AxiosInstance,
 * isLoggedIn: Boolean
 * }}
 */
const usePreRequest = () => {
  const { isLoggedIn } = useSelector(state => state.auth)
  return { http, isLoggedIn }
}

export default usePreRequest
