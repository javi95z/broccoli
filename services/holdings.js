import { usePreRequest, useUnauthorized } from "../hooks"
import { setHoldings, setLoading, setError } from "../slices/holdings"
import settings from "../settings.json"

const route = settings.API_ROUTES.HOLDINGS

/**
 * @returns {{ performRequest: Promise<Holding[]> }}
 */
export const useGetHoldings = () => {
  const { http, dispatch, t } = usePreRequest()
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
