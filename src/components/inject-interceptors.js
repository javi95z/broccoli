import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setupInterceptors } from "../services/http"

const InjectInterceptors = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    setupInterceptors(dispatch)
  }, [dispatch])

  return null
}

export default InjectInterceptors
