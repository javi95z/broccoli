import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { usePreRequest, useUnauthorized } from "./hooks"
import { setTransactions, setLoading, setError } from "../slices/transactions"
import { toast } from "./"
import settings from "../settings.json"

const route = settings.API_ROUTES.TRANSACTIONS

/**
 * @returns {{ performRequest: Promise<Transaction[]> }}
 */
export const useGetTransactions = () => {
  const [t] = useTranslation()
  const { http } = usePreRequest()
  const dispatch = useDispatch()
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
  const [t] = useTranslation()
  const [loading, setLoading] = useState(false)
  const { http } = usePreRequest()
  const getTransactions = useGetTransactions()
  useUnauthorized()

  const performRequest = async body => {
    console.info("[Broccoli] POST Transaction", body)
    setLoading(true)
    try {
      const { data } = await http.post(route, body)
      getTransactions()
      toast.success(t("transactions.message.added"))
      return data
    } catch (error) {
      toast.error(t("transactions.message.notAdded"))
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
  const [t] = useTranslation()
  const [loading, setLoading] = useState(false)
  const { http } = usePreRequest()
  const getTransactions = useGetTransactions()
  useUnauthorized()

  const performRequest = async params => {
    console.info("[Broccoli] DELETE Transaction", id)
    setLoading(true)
    try {
      const { data } = await http.delete(`${route}/${id}`, { params })
      getTransactions()
      toast.success(t("transactions.message.removed"))
      return data
    } catch (error) {
      toast.error(t("transactions.message.notRemoved"))
    } finally {
      setLoading(false)
    }
  }

  return { performRequest, loading }
}
