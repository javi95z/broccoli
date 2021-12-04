import { useState } from "react"
import { useTranslation } from "react-i18next"
import { usePreRequest, useUnauthorized } from "../hooks"
import { toast } from "./"
import settings from "../settings.json"

const route = settings.API_ROUTES.COINS

/**
 * @returns {{ performRequest: Promise<Coin[]>, loading: Boolean }}
 */
export const useGetCoins = () => {
  const [t] = useTranslation()
  const [loading, setLoading] = useState(false)
  const { http } = usePreRequest()
  useUnauthorized()

  const performRequest = async params => {
    console.info("[Broccoli] GET Coins")
    setLoading(true)
    try {
      const { data } = await http.get(route, { params })
      return data
    } catch (error) {
      const { message } = error.response?.data
      toast.error(message || t("coins.message.notLoaded"))
    } finally {
      setLoading(false)
    }
  }

  return { performRequest, loading }
}

/**
 * @param {String} id ID of coin
 * @returns {{ performRequest: Promise<Coin>, loading: Boolean, error: Boolean }}
 */
export const useGetCoin = id => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { http } = usePreRequest()
  useUnauthorized()

  const performRequest = async () => {
    console.info("[Broccoli] GET Coin", id)
    setLoading(true)
    try {
      const { data } = await http.get(`${route}/${id}`)
      return data
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return { performRequest, loading, error }
}
