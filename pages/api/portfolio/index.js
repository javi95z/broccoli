import apiHandler from "../middleware/api-handler"
import i18n from "i18next"
import { Holding } from "../models"
import { populateCoin } from "../utils/populate"
import {
  getBalanceDiff,
  getPercentageDiff,
  getPercentageOfTotal,
  getTotalValue,
  sortData
} from "../utils/api-utils"

// Get portfolio by owner
const getPortfolio = async (req, res) => {
  try {
    const query = { owner: req.userId, amount: { $gt: 0 } }
    const data = await Holding.find(query).populate("coin", populateCoin).lean()

    if (!data) throw new Error(i18n.t("common.errors.notFound"))
    if (!data.length) {
      return res.send([])
    }

    const totals = getPortfolioTotals(data)
    const breakdown = getPortfolioBreakdown(data, totals.amount)
    res.json({ totals, breakdown })
  } catch ({ message }) {
    res.status(500).send({ error: true, message })
  }
}

export default apiHandler(getPortfolio)

/**
 * Calculate total portfolio value
 * @private
 * @param {Holding[]} data Array of holdings
 * @returns {PortfolioTotals}
 */
const getPortfolioTotals = data => {
  return data.reduce((prev, next) => {
    const { amount, averagePrice, coin } = next
    const balance = getBalanceDiff(amount, averagePrice, coin.price)
    const percentage = getPercentageDiff(averagePrice, coin.price)
    return {
      amount: (prev.amount ?? 0) + getTotalValue(amount, coin.price),
      balance: (prev.balanceDiff ?? 0) + balance,
      percentage: (prev.percentageDiff ?? 0) + percentage
    }
  }, {})
}

/**
 * Get portfolio coin breakdown
 * @private
 * @param {Holding[]} array Array of holdings
 * @param {Number} total Total value of array
 * @returns {PortfolioBreakdown[]}
 */
const getPortfolioBreakdown = (array, total) => {
  const breakdown = array.map(item => {
    const { coin, amount } = item
    const value = getTotalValue(coin.price, amount)
    const percentage = getPercentageOfTotal(value, total)
    return { coin, percentage }
  })
  return sortData(breakdown, "percentage", "desc")
}
