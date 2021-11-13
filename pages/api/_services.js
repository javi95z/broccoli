import i18n from "i18next"
import { Transaction } from "./models"
import { mutateTransactionsArray } from "./utils/helpers"
import { populateCoin } from "./utils/populate"

/**
 * Get transactions
 * @param {Object} query
 * @returns {Promise<Array>}
 */
export const getTransactions = async query => {
  try {
    const data = await Transaction.find(query)
      .populate("coin", populateCoin)
      .sort({ date: -1 })
      .lean()
    if (!data) throw new Error(i18n.t("transactions.message.notLoaded"))
    if (!data.length) {
      return []
    }

    // Mutate data
    return mutateTransactionsArray(data)
  } catch ({ message }) {
    return { error: true, message }
  }
}
