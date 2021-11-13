import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useGetRequest } from "./hooks"
import { setPortfolio, setLoading } from "../slices/portfolio"
import settings from "../settings.json"

const route = settings.API_ROUTES.PORTFOLIO

export const useGetPortfolio = isInit => {
  const { performRequest, data, loading } = useGetRequest(route, isInit)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPortfolio(data))
  }, [data])

  useEffect(() => {
    dispatch(setLoading(loading))
  }, [loading])

  return { performRequest, loading, data }
}
