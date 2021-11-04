import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useOnInit } from "../services"

const Init = () => {
  const { fetch } = useOnInit()
  const { isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => {
    if (isLoggedIn) {
      fetch()
    }
  }, [isLoggedIn])

  return null
}

export default Init
