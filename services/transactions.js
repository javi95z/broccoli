import { useState } from "react"
import { useTranslation } from "react-i18next"
import { usePreRequest, useUnauthorized } from "../hooks"
import { toast, useOnInit } from "./"
import settings from "../settings.json"

const route = settings.API_ROUTES.TRANSACTIONS

export const useUpdateTransaction = id => {
  const { http } = usePreRequest()
  const [t] = useTranslation()
  const [loading, setLoading] = useState(false)
  const fetchInit = useOnInit(true)
  useUnauthorized()

  const attemptRequest = async body => {
    setLoading(true)
    try {
      const { data } = await http.put(`${route}/${id}`, body)
      if (data.error) throw new Error(data.message)
      await fetchInit()
      toast.success(t("transactions.message.updated"))
      return data
    } catch (message) {
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return { attemptRequest, loading }
}
