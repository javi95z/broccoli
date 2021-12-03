import { usePreRequest, useUnauthorized } from "../hooks"
import { setPortfolio, setLoading, setError } from "../slices/portfolio"
import settings from "../settings.json"

const route = settings.API_ROUTES.PORTFOLIO

/**
 * @returns {{ performRequest: Promise<Portfolio> }}
 */
export const useGetPortfolio = () => {
  const { http, dispatch, t } = usePreRequest()
  useUnauthorized()

  const performRequest = async params => {
    console.info("[Broccoli] GET Portfolio")
    dispatch(setLoading(true))
    try {
      const { data } = await http.get(route, { params })
      dispatch(setPortfolio(data))
      return data
    } catch (error) {
      dispatch(setPortfolio(null))
      dispatch(setError(t("portfolio.message.notLoaded")))
    } finally {
      dispatch(setLoading(false))
    }
  }

  return { performRequest }
}
