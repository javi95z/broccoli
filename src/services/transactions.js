import { useState } from "react"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { setData, setLoading } from "../slices/transactions"
import {
  useGetRequest,
  usePreRequest,
  usePostRequest,
  useUnauthorized
} from "../hooks"
import { toast, useOnInit } from "./"
import settings from "../settings.json"

const route = settings.API_ROUTES.TRANSACTIONS

export const useLatestTransactions = (skipLoad = false) => {
  const [t] = useTranslation()
  const dispatch = useDispatch()
  const { attemptRequest } = useGetRequest(route)

  const fetch = async () => {
    !skipLoad && dispatch(setLoading(true))
    try {
      const response = await attemptRequest()
      !response.error && dispatch(setData(response))
    } catch {
      toast.error(t("transactions.message.notLoaded"))
    } finally {
      !skipLoad && dispatch(setLoading(false))
    }
  }

  return { fetch }
}

export const useGetTransactions = () => {
  const { attemptRequest, loading } = useGetRequest(route)
  return { attemptRequest, loading }
}

export const useAddTransaction = () => {
  const [t] = useTranslation()
  const { fetch } = useOnInit(true)
  const { attemptRequest, loading } = usePostRequest(route)

  const attemptAdding = async body => {
    try {
      const data = await attemptRequest(body)
      if (data.error) throw new Error(data.message)
      await fetch()
      toast.success(t("transactions.message.added"))
      return data
    } catch ({ message }) {
      toast.error(message)
    }
  }

  return { attemptRequest: attemptAdding, loading }
}

export const useUpdateTransaction = id => {
  const { http } = usePreRequest()
  const [t] = useTranslation()
  const [loading, setLoading] = useState(false)
  const { fetch } = useOnInit(true)
  useUnauthorized()

  const attemptRequest = async body => {
    setLoading(true)
    try {
      const { data } = await http.put(`${route}/${id}`, body)
      if (data.error) throw new Error(data.message)
      await fetch()
      toast.success(t("transactions.message.updated"))
      return data
    } catch ({ message }) {
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return { attemptRequest, loading }
}

export const useRemoveTransaction = () => {
  const { http } = usePreRequest()
  const [t] = useTranslation()
  const [loading, setLoading] = useState(false)
  const { fetch } = useOnInit(true)
  useUnauthorized()

  const attemptRequest = async id => {
    setLoading(true)
    try {
      const { data } = await http.delete(`${route}/${id}`)
      await fetch()
      toast.success(t("transactions.message.removed"))
      return data
    } catch ({ response }) {
      toast.error(t("transactions.message.notRemoved"))
      return response.data
    } finally {
      setLoading(false)
    }
  }

  return { attemptRequest, loading }
}
