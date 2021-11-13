import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useGetRequest } from "./hooks"
import { setHoldings, setLoading } from "../slices/holdings"
import settings from "../settings.json"

const route = settings.API_ROUTES.HOLDINGS

export const useGetHoldings = isInit => {
  const { performRequest, data, loading } = useGetRequest(route, isInit)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setHoldings(data))
  }, [data])

  useEffect(() => {
    dispatch(setLoading(loading))
  }, [loading])

  return { performRequest, loading, data }
}
