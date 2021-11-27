import { useCallback } from "react"
import { useGetTransactions, useGetHoldings, useGetPortfolio } from "./"

/**
 * @returns {{ fetch: Function }}
 */
const useOnInit = () => {
  const getTransactions = useGetTransactions()
  // const holdingsSvc = useGetHoldings()
  // const portfolioSvc = useGetPortfolio()

  const fetchInit = useCallback(async () => {
    return await Promise.all([
      getTransactions.performRequest()
      // holdingsSvc.performRequest(),
      // portfolioSvc.performRequest()
    ])
  }, [])

  return fetchInit
}

export default useOnInit
