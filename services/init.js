import { useLatestTransactions, useGetHoldings, useGetPortfolio } from "./"

export const useOnInit = (skipLoad = false) => {
  const transactionsSvc = useLatestTransactions(skipLoad)
  const holdingsSvc = useGetHoldings(skipLoad)
  const portfolioSvc = useGetPortfolio(skipLoad)

  const fetch = async () => {
    holdingsSvc.fetch()
    transactionsSvc.fetch()
    portfolioSvc.fetch()
  }

  return { fetch }
}
