import mongoose from "mongoose"
import i18n from "i18next"
import { Transaction } from "./models"
import { mutateTransactionsArray } from "./utils/helpers"
import { getAverage, getNewAmount } from "./utils/api-utils"
import { populateCoin } from "./utils/populate"

/**
 * Get transactions
 * @param {Object} query
 * @returns {Promise<Holding[]>}
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
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Update holding
 * @param {Object} query
 * @returns {Promise<Holding>}
 */
export const updateHolding = async query => {
  try {
    const { owner, coin, type, amount, price } = query
    /** @type {Holding} */
    const holding = await Holding.findOne({
      owner: mongoose.Types.ObjectId(owner),
      coin: mongoose.Types.ObjectId(coin)
    })
    const previousAmount = holding ? holding.amount : 0
    const newAmount = getNewAmount(type, previousAmount, amount)
    const previousAverage = holding ? holding.averagePrice : price
    const newAverage = newAmount === 0 ? 0 : getAverage(previousAverage, price)

    // Throw error if updated holding is a negative amount
    if (newAmount < 0)
      throw new Error(i18n.t("holdings.message.insufficientHoldings"))

    if (holding) {
      // Update holding
      holding.amount = newAmount
      holding.averagePrice = newAverage
      await holding.save()
    } else {
      // Create holding
      await Holding.create({
        owner: mongoose.Types.ObjectId(owner),
        coin: mongoose.Types.ObjectId(coin),
        amount: newAmount,
        averagePrice: newAverage
      })
    }
  } catch (error) {
    return Promise.reject(error)
  }
}
