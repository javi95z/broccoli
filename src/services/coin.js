import { useState } from "react"
import { usePreRequest, useUnauthorized } from "../hooks"
import settings from "../settings.json"

const route = settings.API_URL + settings.API_ROUTES.COINS

export const useGetCoin = () => {
  const { http } = usePreRequest()
  const [loading, setLoading] = useState(false)
  useUnauthorized()

  const attemptRequest = async id => {
    setLoading(true)
    try {
      const { data } = await http.get(`${route}/${id}`)
      return data
    } catch ({ response }) {
      return response.data
    } finally {
      setLoading(false)
    }
  }

  return { attemptRequest, loading }
}
