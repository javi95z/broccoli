import { getBalanceDiff, getPercentageDiff } from "./api-utils"

/**
 * Mutate calculated data
 * Add balance difference
 * Add percentage difference
 * @param {Transaction[]} data Array of transactions
 * @returns {Transaction[]}
 */
export const mutateTransactionsArray = data => {
  return data.reduce((prev, next) => {
    const record = mutateTransactionRecord(next)
    return [...prev, record]
  }, [])
}

/**
 * Mutate calculated data
 * Add balance difference
 * Add percentage difference
 * @param {Transaction} data Transaction
 * @returns {Transaction}
 */
export const mutateTransactionRecord = data => {
  const { amount, price, coin } = data
  const balanceDiff = getBalanceDiff(amount, price, coin.price)
  const percentageDiff = getPercentageDiff(price, coin.price)
  return { ...data, balanceDiff, percentageDiff }
}
