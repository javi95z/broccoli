import { useState } from "react"
import { usePreRequest, useUnauthorized } from "./"
import settings from "../settings.json"

const useGetRequest = path => {
  const { http } = usePreRequest()
  const [loading, setLoading] = useState(false)
  const route = `${settings.API_URL}${path}`
  useUnauthorized()

  const attemptRequest = async () => {
    setLoading(true)
    try {
      const { data } = await http.get(route)
      return data
    } catch ({ response }) {
      console.log(response)
    } finally {
      setLoading(false)
    }
  }

  return { attemptRequest, loading }
}

export default useGetRequest
