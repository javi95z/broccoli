import i18n from "i18next"
import apiHandler from "../middleware/api-handler"
import { Transaction } from "../models"
import { getInvertedType } from "../utils/api-utils"
import { updateHolding } from "../_services"

const handler = async (req, res) => {
  const { userId, method, query } = req
  if (method === "DELETE") {
    // Remove transaction
    try {
      // Update holding
      const data = await Transaction.findById(query.id).lean()
      const newQuery = {
        ...data,
        owner: userId,
        type: getInvertedType(data.type)
      }
      console.log("UPDATE holding", newQuery)
      await updateHolding(newQuery)

      // Delete transaction
      await Transaction.findByIdAndDelete(query.id)
      if (!data) throw new Error(i18n.t("transactions.message.notFound"))

      res.json(data)
    } catch ({ message }) {
      res.status(500).send({ error: true, message })
    }
  }
}

export default apiHandler(handler)
