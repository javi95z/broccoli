import { useState } from "react"
import { usePreRequest, useUnauthorized } from "./"

const useGetRequest = route => {
  const { http } = usePreRequest()
  const [loading, setLoading] = useState(false)
  useUnauthorized()

  const attemptRequest = async params => {
    setLoading(true)
    try {
      const { data } = await http.get(route, { params })
      return data
    } catch (response) {
      return response.data
    } finally {
      setLoading(false)
    }
  }

  return { attemptRequest, loading }
}

export default useGetRequest
