import { useState } from "react"
import { usePreRequest, useUnauthorized } from "./"

const useDeleteRequest = (path, id) => {
  const { http } = usePreRequest()
  const [loading, setLoading] = useState(false)
  const route = `${path}/${id}`
  useUnauthorized()

  const attemptRequest = async () => {
    setLoading(true)
    try {
      await http.delete(route)
      return true
    } catch ({ response }) {
      console.error(response)
    } finally {
      setLoading(false)
    }
  }

  return { attemptRequest, loading }
}

export default useDeleteRequest
