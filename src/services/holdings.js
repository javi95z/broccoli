import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useGetRequest } from "../hooks"
import { toast } from "./"
import { setData, setLoading } from "../slices/holdings"
import settings from "../settings.json"

const route = settings.API_ROUTES.HOLDINGS

export const useGetHoldings = (skipLoad = false) => {
  const [t] = useTranslation()
  const dispatch = useDispatch()
  const { attemptRequest } = useGetRequest(route)

  const fetch = async () => {
    !skipLoad && dispatch(setLoading(true))
    try {
      const response = await attemptRequest()
      !response.error && dispatch(setData(response))
    } catch {
      toast.error(t("holdings.errors.couldntLoad"))
    } finally {
      !skipLoad && dispatch(setLoading(false))
    }
  }

  return { fetch }
}
