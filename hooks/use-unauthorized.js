import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logInSuccess } from "../slices/auth"
import settings from "../settings.json"

const useUnauthorized = () => {
  const { isLoggedIn } = useSelector(state => state.auth)
  const router = useRouter()
  const dispatch = useDispatch()

  /**
   * When the user is not logged in check for localStorage
   * If user data is in localStorage, set it in the store
   * Otherwise redirect to root page
   */
  useEffect(() => {
    if (isLoggedIn) return
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch(logInSuccess(user))
    } else {
      router.push(settings.ROUTES.WELCOME)
    }
  }, [isLoggedIn])
}

export default useUnauthorized
