import { useRouter } from "next/router"
import { useState } from "react"
import { setLogIn, logOutSuccess, setUserData } from "../slices/auth"
import { clearTransactions } from "../slices/transactions"
import { clearHoldings } from "../slices/holdings"
import { clearPortfolio } from "../slices/portfolio"
import { usePreRequest } from "../hooks"
import { toast } from "./"
import settings from "../settings.json"

/**
 * @returns {{ performRequest: Promise<Boolean>, loading: Boolean }}
 */
export const useLogIn = () => {
  const { http, dispatch, t } = usePreRequest()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const route = settings.API_ROUTES.LOG_IN

  const performRequest = async body => {
    console.info("[Broccoli] POST Login", body)
    setLoading(true)
    try {
      const { data } = await http.post(route, body)
      dispatch(setLogIn(data))
      return onLoginSuccessful(data)
    } catch (error) {
      const { message } = error?.response?.data
      toast.error(message || t("login.message.generic"))
      return false
    } finally {
      setLoading(false)
    }
  }

  // Actions to perform when login is successful
  const onLoginSuccessful = data => {
    updateLocalStorage(data)
    toast.clear()
    router.push(settings.ROUTES.USER_DEFAULT)
    return true
  }

  return { performRequest, loading }
}

/**
 * @returns {{ performRequest: Promise<Boolean>, loading: Boolean }}
 */
export const useLogOut = () => {
  const { http, dispatch } = usePreRequest()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const route = settings.API_ROUTES.LOG_OUT

  const performRequest = async () => {
    console.info("[Broccoli] PUT Logout")
    setLoading(true)
    try {
      await http.put(route)
      dispatch(logOutSuccess())
      return onLogoutSuccessful()
    } catch (error) {
      const { message } = error?.response?.data
      toast.error(message || t("logout.message.generic"))
    } finally {
      setLoading(false)
    }
  }

  // Actions to perform when logout is successful
  const onLogoutSuccessful = () => {
    localStorage.removeItem("user")
    dispatch(clearTransactions())
    dispatch(clearHoldings())
    dispatch(clearPortfolio())
    router.push(settings.ROUTES.ROOT)
    return true
  }

  return { performRequest, loading }
}

/**
 * @returns {{ performRequest: Promise<Boolean>, loading: Boolean }}
 */
export const useSignUp = () => {
  const { http, dispatch, t } = usePreRequest()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const route = settings.API_ROUTES.SIGN_UP

  const performRequest = async body => {
    console.info("[Broccoli] POST Signup", body)
    setLoading(true)
    try {
      const { data } = await http.post(route, body)
      dispatch(setLogIn(data))
      return onSignupSuccessful(data)
    } catch (error) {
      const { message } = error?.response?.data
      toast.error(message || t("signup.message.generic"))
      return false
    } finally {
      setLoading(false)
    }
  }

  // Actions to perform when signup is successful
  const onSignupSuccessful = data => {
    updateLocalStorage(data)
    router.push(settings.ROUTES.USER_DEFAULT)
    return true
  }

  return { performRequest, loading }
}

/**
 * @returns {{ performRequest: Promise<Boolean>, loading: Boolean }}
 */
export const useGoogleLogIn = () => {
  const { http, dispatch, t } = usePreRequest()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const route = settings.API_ROUTES.GOOGLE_AUTH

  const performRequest = async body => {
    console.info("[Broccoli] POST Google Login", body)
    setLoading(true)
    try {
      const { data } = await http.post(route, body)
      if (data.error) throw new Error(data.message)
      dispatch(setLogIn(data))
      return onLoginSuccessful(data)
    } catch (error) {
      const { message } = error?.response?.data
      toast.error(message || t("login.message.generic"))
      return false
    } finally {
      setLoading(false)
    }
  }

  // Actions to perform when login is successful
  const onLoginSuccessful = data => {
    updateLocalStorage(data)
    toast.clear()
    router.push(settings.ROUTES.USER_DEFAULT)
    return true
  }

  return { performRequest, loading }
}

/**
 * @returns {{ performRequest: Promise<Boolean>, loading: Boolean }}
 */
export const useGetLoggedUser = () => {
  const { http, dispatch, t } = usePreRequest()
  const [loading, setLoading] = useState(false)
  const route = settings.API_ROUTES.ME

  const performRequest = async () => {
    console.info("[Broccoli] GET Logged user")
    setLoading(true)
    try {
      const { data } = await http.get(route)
      dispatch(setUserData(data))
      return data
    } catch (error) {
      const { message } = error?.response?.data
      toast.error(message || t("profile.message.notLoaded"))
      return false
    } finally {
      setLoading(false)
    }
  }

  return { performRequest, loading }
}

/**
 * @returns {{ performRequest: Promise<Boolean>, loading: Boolean }}
 */
export const useUpdateUser = () => {
  const { http, dispatch, t } = usePreRequest()
  const [loading, setLoading] = useState(false)
  const route = settings.API_ROUTES.ME

  const performRequest = async body => {
    console.info("[Broccoli] PUT Update user", body)
    setLoading(true)
    try {
      const { data } = await http.put(route, body)
      dispatch(setLogIn(data))
      updateLocalStorage(data)
      toast.success(t("profile.message.updated"))
      return true
    } catch (error) {
      const { message } = error?.response?.data
      toast.error(message || t("profile.message.notUpdated"))
      return false
    } finally {
      setLoading(false)
    }
  }

  return { performRequest, loading }
}

/**
 * Update local storage user info
 * @private
 * @param {Object} data
 */
const updateLocalStorage = data => {
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
