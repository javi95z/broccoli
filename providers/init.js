import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useOnInit } from "../services"

const Init = () => {
  const fetchInit = useOnInit()
  const { isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => {
    if (isLoggedIn) {
      fetchInit()
    }
  }, [isLoggedIn])

  return null
}

export default Init
