import mongoose from "mongoose"
import apiHandler from "../middleware/api-handler"
import { Transaction } from "../models"
import { removeEmpty } from "../utils/api-utils"
import { validateTransaction } from "../utils/validations"
import { getTransactions, updateHolding } from "../_services"

const handler = async (req, res) => {
  if (req.method === "POST") {
    // Add transaction
    try {
      validateTransaction(req.body)
      const { coin, type, amount, price } = req.body

      // Update holding
      const query = { owner: req.userId, coin, type, amount, price }
      await updateHolding(query)

      // Create transaction
      const transaction = await Transaction.create({
        ...req.body,
        owner: mongoose.Types.ObjectId(req.userId)
      })

      res.json(transaction)
    } catch ({ message }) {
      res.status(500).send({ error: true, message })
    }
  } else {
    // Get transactions
    try {
      const query = removeEmpty({
        owner: req.userId,
        coin: req.query.coin ?? null
      })
      const data = await getTransactions(query)
      return res.json(data)
    } catch ({ message }) {
      return res.status(500).send({ error: true, message })
    }
  }
}

export default apiHandler(handler)
