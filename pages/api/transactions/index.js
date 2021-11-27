import i18n from "i18next"
import mongoose from "mongoose"
import apiHandler from "../middleware/api-handler"
import { Transaction } from "../models"
import { removeEmpty } from "../utils/api-utils"
import { getTransactions } from "../_services"

const handler = async (req, res) => {
  if (req.method === "POST") {
    // Add transaction
    try {
      const transaction = await Transaction.create({
        ...req.body,
        owner: mongoose.Types.ObjectId(req.userId)
      })

      // Update holding
      // await update(req, res)

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
      if (data.error) throw new Error(data.message)
      return res.json(data)
    } catch ({ message }) {
      return res.status(500).send({ error: true, message })
    }
  }
}

export default apiHandler(handler)
