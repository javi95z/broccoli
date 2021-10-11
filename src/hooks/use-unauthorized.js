import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logInSuccess } from "../slices/auth"
import settings from "../settings.json"

const useUnauthorized = () => {
  const { isLoggedIn } = useSelector(state => state.auth)
  const history = useHistory()
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
      history.push(settings.ROUTES.ROOT)
    }
  }, [isLoggedIn])
}

export default useUnauthorized
