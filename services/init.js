import { useGetTransactions, useGetHoldings, useGetPortfolio } from "./"

export const useOnInit = () => {
  useGetTransactions(true)
  useGetHoldings(true)
  useGetPortfolio(true)

  const fetch = async () => {}

  return fetch
}
