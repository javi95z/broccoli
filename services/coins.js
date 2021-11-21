import { useGetRequest } from "./hooks"
import settings from "../settings.json"

const route = settings.API_ROUTES.COINS

export const useGetCoins = isInit => {
  return useGetRequest(route, isInit)
}

/**
 * @param {String} id
 * @param {Boolean} isInit
 * @returns {GetRequest}
 */
export const useGetCoin = (id, isInit) => {
  return useGetRequest(route + "/" + id, isInit)
}
