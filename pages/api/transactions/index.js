import apiHandler from "../middleware/api-handler"
import { Transaction } from "../models"
import { removeEmpty } from "../utils/api-utils"
import { populateCoin } from "../utils/populate"
import { mutateTransactionsArray } from "../utils/helpers"

// Get transactions
const getTransactions = async (req, res) => {
  console.log(req.query)
  try {
    const query = removeEmpty({
      owner: req.userId,
      coin: req.query.coin ?? null
    })
    const data = await Transaction.find(query)
      .populate("coin", populateCoin)
      .sort({ date: -1 })
      .lean()
    if (!data) throw new Error("NOT_FOUND")
    if (!data.length) {
      return []
    }

    const mutated = mutateTransactionsArray(data)
    return res.json(mutated)
  } catch ({ message }) {
    return res.status(500).send({ error: true, message })
  }
}

export default apiHandler(getTransactions)
