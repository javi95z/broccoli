import { AxiosInstance } from "axios"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import http from "../services/http"

/**
 * @typedef {Object} PreRequest
 * @property {AxiosInstance} http
 * @property {Boolean} isLoggedIn
 * @property {Function} dispatch
 * @property {Function} t
 *
 * @returns {PreRequest}
 */
const usePreRequest = () => {
  const [t] = useTranslation()
  const { isLoggedIn } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  return { http, isLoggedIn, dispatch, t }
}

export default usePreRequest
