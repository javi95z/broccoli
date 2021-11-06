import { useDispatch } from "react-redux"
import { fetchPortfolio } from "../slices/portfolio"
import { fetchHoldings } from "../slices/holdings"
import { fetchTransactions } from "../slices/transactions"

export const useOnInit = () => {
  const dispatch = useDispatch()

  const fetch = async () => {
    dispatch(fetchPortfolio())
    dispatch(fetchHoldings())
    dispatch(fetchTransactions())
  }

  return fetch
}
