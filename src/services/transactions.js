import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { setData, removeData, addData } from "../slices/transactions"
import { useGetRequest, usePreRequest, useUnauthorized } from "../hooks"
import { toast } from "../services"
import settings from "../settings.json"

const route = settings.API_URL + settings.API_ROUTES.TRANSACTIONS

export const useLatestTransactions = () => {
  const dispatch = useDispatch()
  const { attemptRequest } = useGetRequest(route)
  const [loading, setLoading] = useState(false)

  const fetch = async () => {
    setLoading(true)
    try {
      const response = await attemptRequest()
      !response.error && dispatch(setData(response))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return { fetch, loading }
}

export const useGetTransactions = () => {
  const { attemptRequest, loading } = useGetRequest(route)
  return { attemptRequest, loading }
}

export const useAddTransaction = () => {
  const dispatch = useDispatch()
  const { http } = usePreRequest()
  const [t] = useTranslation()
  const [loading, setLoading] = useState(false)
  useUnauthorized()

  const attemptRequest = async body => {
    setLoading(true)
    try {
      const { data } = await http.post(route, body)
      dispatch(addData(data))
      toast(t("transactions.success.added"), "success")
      return data
    } catch ({ response }) {
      toast(response?.data.message, "error")
    } finally {
      setLoading(false)
    }
  }

  return { attemptRequest, loading }
}

export const useRemoveTransaction = () => {
  const dispatch = useDispatch()
  const { http } = usePreRequest()
  const [t] = useTranslation()
  const [loading, setLoading] = useState(false)
  useUnauthorized()

  const attemptRequest = async id => {
    setLoading(true)
    try {
      const { data } = await http.delete(`${route}/${id}`)
      dispatch(removeData(id))
      toast(t("transactions.success.removed"), "success")
      return data
    } catch ({ response }) {
      toast(t("transactions.errors.notRemoved"), "error")
      return response.data
    } finally {
      setLoading(false)
    }
  }

  return { attemptRequest, loading }
}
