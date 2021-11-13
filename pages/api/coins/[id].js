import i18n from "i18next"
import apiHandler from "../middleware/api-handler"
import { Coin } from "../models"
import { getTransactions } from "../_services"

// Coin details information
const handler = async (req, res) => {
  try {
    const data = await Coin.findOne({ id: req.query.id }).lean()
    if (!data) throw new Error(i18n.t("common.errors.notFound"))

    // Include coin transactions if logged in
    if (req.userId) {
      const query = { owner: req.userId, coin: data._id }
      const transactions = await getTransactions(query)
      data.transactions = !transactions.error && transactions
    }

    res.json(data)
  } catch ({ message }) {
    res.status(500).send({ error: true, message })
  }
}

export default apiHandler(handler)
