import { useCallback, useEffect, useState } from "react"
import { usePreRequest, useUnauthorized } from "./"
import { toast } from "../"

/**
 *
 * @param {String} route
 * @param {Boolean} [isInit] Whether request should be performed on init
 * @returns {GetRequest}
 */
const useGetRequest = (route, isInit = false) => {
  const { http, isLoggedIn } = usePreRequest()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  useUnauthorized()

  const performRequest = useCallback(async params => {
    try {
      setLoading(true)
      const response = await http.get(route, { params })
      setData(response.data)
      return response.data
    } catch (e) {
      setError(true)
      toast.error(e.response.data.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    isLoggedIn && isInit && performRequest()
  }, [isInit, isLoggedIn])

  return { performRequest, data, loading, error }
}

export default useGetRequest
