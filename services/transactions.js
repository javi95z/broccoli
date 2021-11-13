import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useGetRequest } from "./hooks"
import { setTransactions, setLoading } from "../slices/transactions"
import settings from "../settings.json"

const route = settings.API_ROUTES.TRANSACTIONS

export const useGetTransactions = isInit => {
  const { performRequest, data, loading } = useGetRequest(route, isInit)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTransactions(data))
  }, [data])

  useEffect(() => {
    dispatch(setLoading(loading))
  }, [loading])

  return { performRequest, loading, data }
}
