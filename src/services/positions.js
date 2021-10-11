import { useDispatch } from "react-redux"
import { getData, getDataSuccess, getDataError } from "../slices/positions"
import { usePreRequest, useUnauthorized } from "../hooks"
import settings from "../settings.json"

export const useGetPositions = () => {
  const dispatch = useDispatch()
  const { http } = usePreRequest()
  const route = settings.API_URL + settings.API_ROUTES.POSITIONS
  useUnauthorized()

  const attemptRequest = async () => {
    dispatch(getData())
    try {
      const { data } = await http.get(route)
      dispatch(getDataSuccess(data))
    } catch ({ response }) {
      dispatch(getDataError(response?.data?.message))
    }
  }

  return attemptRequest
}
