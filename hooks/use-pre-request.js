import { useSelector } from "react-redux"
import http from "../services/http"

const usePreRequest = () => {
  const { isLoggedIn } = useSelector(state => state.auth)
  return { http, isLoggedIn }
}

export default usePreRequest
