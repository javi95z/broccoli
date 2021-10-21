import { useGetRequest } from "../hooks"
import settings from "../settings.json"

const route = settings.API_ROUTES.COINS

export const useGetCoins = () => {
  const { attemptRequest, loading } = useGetRequest(route)
  return { attemptRequest, loading }
}

export const useGetCoin = id => {
  const { attemptRequest, loading } = useGetRequest(`${route}/${id}`)
  return { attemptRequest, loading }
}
