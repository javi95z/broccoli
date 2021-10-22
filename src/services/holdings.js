import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useGetRequest } from "../hooks"
import settings from "../settings.json"
import { setData } from "../slices/holdings"

const route = settings.API_ROUTES.HOLDINGS

export const useGetHoldings = () => {
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
