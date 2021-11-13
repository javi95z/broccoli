import { useState } from "react"
import { usePreRequest, useUnauthorized } from "."

const usePostRequest = route => {
  const { http } = usePreRequest()
  const [loading, setLoading] = useState(false)
  useUnauthorized()

  const attemptRequest = async body => {
    setLoading(true)
    try {
      const { data } = await http.post(route, body)
      return data
    } catch (response) {
      return response.data
    } finally {
      setLoading(false)
    }
  }

  return { attemptRequest, loading }
}

export default usePostRequest
