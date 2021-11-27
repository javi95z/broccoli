import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { usePreRequest, useUnauthorized } from "./hooks"
import { setHoldings, setLoading, setError } from "../slices/holdings"
import settings from "../settings.json"

const route = settings.API_ROUTES.HOLDINGS

/**
 * @returns {{ performRequest: Promise<Holding[]> }}
 */
export const useGetHoldings = () => {
  const [t] = useTranslation()
  const { http } = usePreRequest()
  const dispatch = useDispatch()
  useUnauthorized()

  const performRequest = async params => {
    console.info("[Broccoli] GET Holdings")
    dispatch(setLoading(true))
    try {
      const { data } = await http.get(route, { params })
      dispatch(setHoldings(data))
      return data
    } catch (error) {
      dispatch(setHoldings(null))
      dispatch(setError(t("holdings.message.notLoaded")))
    } finally {
      dispatch(setLoading(false))
    }
  }

  return { performRequest }
}
