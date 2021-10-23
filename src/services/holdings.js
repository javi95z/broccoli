import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useGetRequest } from "../hooks"
import { toast } from "./"
import settings from "../settings.json"
import { setData } from "../slices/holdings"

const route = settings.API_ROUTES.HOLDINGS

export const useGetHoldings = (skipLoad = false) => {
  const [t] = useTranslation()
  const dispatch = useDispatch()
  const { attemptRequest } = useGetRequest(route)
  const [loading, setLoading] = useState(false)

  const fetch = async () => {
    !skipLoad && setLoading(true)
    try {
      const response = await attemptRequest()
      !response.error && dispatch(setData(response))
    } catch {
      toast.error(t("holdings.errors.couldntLoad"))
    } finally {
      !skipLoad && setLoading(false)
    }
  }

  return { fetch, loading }
}
