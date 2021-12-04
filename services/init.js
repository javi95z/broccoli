import { useCallback } from "react"
import { useGetTransactions, useGetHoldings, useGetPortfolio } from "./"

/**
 * @returns {{ fetch: Function }}
 */
const useOnInit = () => {
  const getTransactions = useGetTransactions()
  const getHoldings = useGetHoldings()
  const getPortfolio = useGetPortfolio()

  const fetchInit = useCallback(async () => {
    return await Promise.all([
      getTransactions.performRequest(),
      getHoldings.performRequest(),
      getPortfolio.performRequest()
    ])
  }, [])

  return fetchInit
}

export default useOnInit
