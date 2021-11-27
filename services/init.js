import { useCallback } from "react"
import { useGetTransactions, useGetHoldings, useGetPortfolio } from "./"

/**
 * @returns {{ fetch: Function }}
 */
const useOnInit = () => {
  const getTransactions = useGetTransactions()
  const getHoldings = useGetHoldings()
  // const portfolioSvc = useGetPortfolio()

  const fetchInit = useCallback(async () => {
    return await Promise.all([
      getTransactions.performRequest(),
      getHoldings.performRequest()
      // portfolioSvc.performRequest()
    ])
  }, [])

  return fetchInit
}

export default useOnInit
