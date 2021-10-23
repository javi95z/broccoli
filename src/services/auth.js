import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import {
  authStart,
  logInSuccess,
  logOutError,
  logOutSuccess
} from "../slices/auth"
import { clearData } from "../slices/transactions"
import { usePreRequest } from "../hooks"
import { toast } from "./"
import settings from "../settings.json"
import { useState } from "react"

export const useLogIn = () => {
  const [t] = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()
  const { http } = usePreRequest()
  const [loading, setLoading] = useState(false)
  const route = settings.API_URL + settings.API_ROUTES.LOG_IN

  const attemptLogin = async body => {
    setLoading(true)
    try {
      const { data } = await http.post(route, body)
      dispatch(logInSuccess(data))
      return onLoginSuccessful(data)
    } catch ({ response }) {
      toast(response?.data?.message || t("login.errors.generic"), "error")
    } finally {
      setLoading(false)
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

  return { attemptLogin, loading }
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
    dispatch(clearData())
    history.replace(settings.ROUTES.ROOT)
    return true
  }

  return attemptLogout
}

export const useSignUp = () => {
  const [t] = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()
  const { http } = usePreRequest()
  const [loading, setLoading] = useState(false)
  const route = settings.API_URL + settings.API_ROUTES.SIGN_UP

  const attemptSignup = async body => {
    setLoading(true)
    try {
      const { data } = await http.post(route, body)
      dispatch(logInSuccess(data))
      return onSignupSuccessful(data)
    } catch ({ response }) {
      toast(response?.data?.message || t("signup.errors.generic"), "error")
    } finally {
      setLoading(false)
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

  return { attemptSignup, loading }
}
