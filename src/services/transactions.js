import { useState } from "react"
import { useDispatch } from "react-redux"
import { getData, getDataSuccess, getDataError } from "../slices/transactions"
import { usePreRequest, useUnauthorized } from "../hooks"
import settings from "../settings.json"

const route = settings.API_URL + settings.API_ROUTES.TRANSACTIONS

export const useGetTransactions = () => {
  const dispatch = useDispatch()
  const { http } = usePreRequest()
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

export const useAddTransaction = () => {
  const { http } = usePreRequest()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  useUnauthorized()

  const attemptRequest = async body => {
    console.log(body)
    setLoading(true)
    try {
      const { data } = await http.post(route, body)
      return data
    } catch ({ response }) {
      setErrors(response.data)
    } finally {
      setLoading(false)
    }
  }

  return { attemptRequest, loading, errors }
}

export const useRemoveTransaction = () => {
  const { http } = usePreRequest()
  const [loading, setLoading] = useState(false)
  useUnauthorized()

  const attemptRequest = async id => {
    setLoading(true)
    try {
      const { data } = await http.delete(`${route}/${id}`)
      return data
    } catch ({ response }) {
      return response.data
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    }
  }

  return { attemptRequest, loading }
}
