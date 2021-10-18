import { useState } from "react"
import { usePreRequest, useUnauthorized } from "./"
import settings from "../settings.json"

const useDeleteRequest = (path, id) => {
  const { http } = usePreRequest()
  const [loading, setLoading] = useState(false)
  const route = `${settings.API_URL}${path}/${id}`
  useUnauthorized()

  const attemptRequest = async () => {
    setLoading(true)
    try {
      await http.delete(route)
      return true
    } catch ({ response }) {
      console.log(response)
    } finally {
      setLoading(false)
    }
  }

  return { attemptRequest, loading }
}

export default useDeleteRequest
