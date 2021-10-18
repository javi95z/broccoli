import { useState } from "react"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { setData, removeData, addData } from "../slices/transactions"
import { usePreRequest, useUnauthorized } from "../hooks"
import { toast } from "../services"
import settings from "../settings.json"

const route = settings.API_URL + settings.API_ROUTES.TRANSACTIONS

export const useGetTransactions = () => {
  const dispatch = useDispatch()
  const { http } = usePreRequest()
  const [loading, setLoading] = useState(false)
  useUnauthorized()

  const attemptRequest = async () => {
    setLoading(true)
    try {
      const { data } = await http.get(route)
      dispatch(setData(data))
    } catch ({ response }) {
      // dispatch(getDataError(response?.data?.message))
    } finally {
      setLoading(false)
    }
  }

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
