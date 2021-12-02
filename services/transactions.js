import { useState } from "react"
import { usePreRequest, useUnauthorized } from "./hooks"
import { setTransactions, setLoading, setError } from "../slices/transactions"
import { useGetHoldings } from "./holdings"
import { useGetPortfolio } from "./portfolio"
import { toast } from "./"
import settings from "../settings.json"

const route = settings.API_ROUTES.TRANSACTIONS

/**
 * @returns {{ performRequest: Promise<Transaction[]> }}
 */
export const useGetTransactions = () => {
  const { http, dispatch, t } = usePreRequest()
  useUnauthorized()

  const performRequest = async params => {
    console.info("[Broccoli] GET Transactions")
    dispatch(setLoading(true))
    try {
      const { data } = await http.get(route, { params })
      dispatch(setTransactions(data))
      return data
    } catch (error) {
      dispatch(setTransactions(null))
      dispatch(setError(t("transactions.message.notLoaded")))
    } finally {
      dispatch(setLoading(false))
    }
  }

  return { performRequest }
}

/**
 * @returns {{ performRequest: Promise<Transaction[]>, loading: Boolean }}
 */
export const useAddTransaction = () => {
  const { http, t } = usePreRequest()
  const [loading, setLoading] = useState(false)
  const transactionsSvc = useGetTransactions()
  const holdingsSvc = useGetHoldings()
  const portfolioSvc = useGetPortfolio()
  useUnauthorized()

  const performRequest = async body => {
    console.info("[Broccoli] POST Transaction", body)
    setLoading(true)
    try {
      const { data } = await http.post(route, body)
      await Promise.all([
        transactionsSvc.performRequest(),
        holdingsSvc.performRequest(),
        portfolioSvc.performRequest()
      ])
      toast.success(t("transactions.message.added"))
      return data
    } catch (error) {
      const { message } = error.response?.data
      toast.error(message || t("transactions.message.notAdded"))
    } finally {
      setLoading(false)
    }
  }

  return { performRequest, loading }
}

/**
 * @param {String} id ID of transaction to be deleted
 * @returns {{ performRequest: Function, loading: Boolean }}
 */
export const useDeleteTransaction = id => {
  const { http, t } = usePreRequest()
  const [loading, setLoading] = useState(false)
  const transactionsSvc = useGetTransactions()
  const holdingsSvc = useGetHoldings()
  const portfolioSvc = useGetPortfolio()
  useUnauthorized()

  const performRequest = async params => {
    console.info("[Broccoli] DELETE Transaction", id)
    setLoading(true)
    try {
      const { data } = await http.delete(`${route}/${id}`, { params })
      await Promise.all([
        transactionsSvc.performRequest(),
        holdingsSvc.performRequest(),
        portfolioSvc.performRequest()
      ])
      toast.success(t("transactions.message.removed"))
      return data
    } catch (error) {
      const { message } = error.response?.data
      toast.error(message || t("transactions.message.notRemoved"))
    } finally {
      setLoading(false)
    }
  }

  return { performRequest, loading }
}
