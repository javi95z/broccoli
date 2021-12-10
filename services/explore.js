import { useState } from "react"
import { usePreRequest, useUnauthorized } from "../hooks"
import settings from "../settings.json"

/**
 * @returns {{ performRequest: Promise<Coin[]>, loading: Boolean }}
 */
export const useBiggestGainers = () => {
  const { http, t } = usePreRequest()
  const [loading, setLoading] = useState(false)
  const route = settings.API_ROUTES.EXPLORE.GAINERS
  useUnauthorized()

  const performRequest = async () => {
    console.info("[Broccoli] GET Explore Biggest gainers")
    setLoading(true)
    try {
      const { data } = await http.get(route)
      return data
    } catch (error) {
      //   dispatch(setError(t("portfolio.message.notLoaded")))
      return null
    } finally {
      setLoading(false)
    }
  }

  return { performRequest, loading }
}
