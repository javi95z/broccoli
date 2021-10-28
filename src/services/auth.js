import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logInSuccess, logOutSuccess, setUserData } from "../slices/auth"
import { clearTransactions } from "../slices/transactions"
import { clearHoldings } from "../slices/holdings"
import { usePreRequest, useGetRequest, usePostRequest } from "../hooks"
import { toast } from "./"
import settings from "../settings.json"

export const useLogIn = () => {
  const [t] = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()
  const { http } = usePreRequest()
  const [loading, setLoading] = useState(false)
  const route = process.env.REACT_APP_API_URL + settings.API_ROUTES.LOG_IN

  const attemptLogin = async body => {
    setLoading(true)
    try {
      const { data } = await http.post(route, body)
      dispatch(logInSuccess(data))
      return onLoginSuccessful(data)
    } catch ({ response }) {
      toast.error(response?.data?.message || t("login.message.generic"))
    } finally {
      setLoading(false)
    }
  }

  /**
   * Actions to perform when login is successful
   */
  const onLoginSuccessful = data => {
    _updateLocalStorage(data)
    toast.clear()
    history.push(settings.ROUTES.USER_DEFAULT)
    return true
  }

  return { attemptLogin, loading }
}

export const useLogOut = () => {
  const { http } = usePreRequest()
  const dispatch = useDispatch()
  const history = useHistory()
  const route = process.env.REACT_APP_API_URL + settings.API_ROUTES.LOG_OUT

  const attemptLogout = async () => {
    try {
      await http.put(route)
      dispatch(logOutSuccess())
      return onLogoutSuccessful()
    } catch ({ response }) {
      toast.error(response?.data?.message || "Error on logout")
    }
  }

  /**
   * Actions to perform when logout is successful
   */
  const onLogoutSuccessful = () => {
    localStorage.removeItem("user")
    dispatch(clearTransactions())
    dispatch(clearHoldings())
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
  const route = process.env.REACT_APP_API_URL + settings.API_ROUTES.SIGN_UP

  const attemptSignup = async body => {
    setLoading(true)
    try {
      const { data } = await http.post(route, body)
      dispatch(logInSuccess(data))
      return onSignupSuccessful(data)
    } catch ({ response }) {
      toast.error(response?.data?.message || t("signup.message.generic"))
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

export const useGetLoggedUser = () => {
  const [t] = useTranslation()
  const dispatch = useDispatch()
  const route = settings.API_ROUTES.ME
  const { attemptRequest, loading } = useGetRequest(route)

  const fetch = async () => {
    try {
      const data = await attemptRequest()
      dispatch(setUserData(data))
      return data
    } catch ({ response }) {
      toast.error(response?.data?.message || t("profile.message.notLoaded"))
    }
  }

  return { attemptRequest: fetch, loading }
}

export const useUpdateUser = () => {
  const [t] = useTranslation()
  const dispatch = useDispatch()
  const route = settings.API_ROUTES.ME
  const { attemptRequest, loading } = usePostRequest(route)

  const performRequest = async body => {
    try {
      const data = await attemptRequest(body)
      dispatch(setUserData(data))
      _updateLocalStorage(data)
      toast.success(t("profile.message.updated"))
      return data
    } catch ({ response }) {
      toast.error(t("profile.message.notUpdated"))
    }
  }

  return { attemptRequest: performRequest, loading }
}

const _updateLocalStorage = data => {
  if (localStorage.key("user")) {
    // If key user exists, we override it
    const currentStg = JSON.parse(localStorage.getItem("user"))
    const newStg = { ...currentStg, ...data }
    localStorage.setItem("user", JSON.stringify(newStg))
  } else {
    // If it doesn't exist, we create it
    localStorage.setItem("user", JSON.stringify(data))
  }
}
