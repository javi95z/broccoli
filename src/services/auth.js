import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import {
  authStart,
  logInError,
  logInSuccess,
  logOutError,
  logOutSuccess
} from "../slices/auth"
import { clearTransactions } from "../slices/transactions"
import { usePreRequest } from "../hooks"
import settings from "../settings.json"

export const useLogIn = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { http } = usePreRequest()
  const route = settings.API_URL + settings.API_ROUTES.LOG_IN

  const attemptLogin = async body => {
    dispatch(authStart())
    try {
      const { data } = await http.post(route, body)
      dispatch(logInSuccess(data))
      return onLoginSuccessful(data)
    } catch ({ response }) {
      dispatch(logInError(response?.data?.message || "Error on login"))
    }
  }

  /**
   * Actions to perform when login is successful
   */
  const onLoginSuccessful = data => {
    localStorage.setItem("user", JSON.stringify(data))
    history.push(settings.ROUTES.USER_DEFAULT)
    return true
  }

  return attemptLogin
}

export const useLogOut = () => {
  const { http } = usePreRequest()
  const dispatch = useDispatch()
  const history = useHistory()
  const route = settings.API_URL + settings.API_ROUTES.LOG_OUT

  const attemptLogout = async () => {
    dispatch(authStart())
    try {
      await http.put(route)
      dispatch(logOutSuccess())
      return onLogoutSuccessful()
    } catch ({ response }) {
      dispatch(logOutError(response?.data?.message || "Error on logout"))
    }
  }

  /**
   * Actions to perform when logout is successful
   */
  const onLogoutSuccessful = () => {
    localStorage.removeItem("user")
    dispatch(clearTransactions())
    history.replace(settings.ROUTES.ROOT)
    return true
  }

  return attemptLogout
}

export const useSignUp = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { http } = usePreRequest()
  const route = settings.API_URL + settings.API_ROUTES.SIGN_UP

  const attemptSignup = async body => {
    dispatch(authStart())
    try {
      const { data } = await http.post(route, body)
      console.log(data)
      dispatch(logInSuccess(data))
      return onSignupSuccessful(data)
    } catch ({ response }) {
      dispatch(logInError(response?.data?.message))
    }
  }

  /**
   * Actions to perform when signup is successful
   */
  const onSignupSuccessful = data => {
    localStorage.setItem("user", JSON.stringify(data))
    history.push(settings.ROUTES.USER_DEFAULT)
    return true
  }

  return attemptSignup
}
