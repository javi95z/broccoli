import { useEffect } from "react"
import { useSelector } from "react-redux"
import {
  useGetHoldings,
  useGetPortfolio,
  useLatestTransactions
} from "../services"

const Init = () => {
  const { isLoggedIn } = useSelector(state => state.auth)
  const portfolioSvc = useGetPortfolio()
  const holdingsSvc = useGetHoldings()
  const transactionsSvc = useLatestTransactions()

  useEffect(() => {
    if (isLoggedIn) {
      holdingsSvc.fetch()
      transactionsSvc.fetch()
      portfolioSvc.fetch()
    }
  }, [isLoggedIn])

  return null
}

export default Init
