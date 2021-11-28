import i18n from "i18next"
import apiHandler from "../middleware/api-handler"
import { Transaction } from "../models"
import { getInvertedType } from "../utils/api-utils"
import { updateHolding } from "../_services"

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    // Remove transaction
    try {
      // Update holding
      const data = await Transaction.findById(req.query.id).lean()
      const query = {
        ...data,
        owner: req.userId,
        type: getInvertedType(data.type)
      }
      console.log("UPDATE holding", query)
      await updateHolding(query)

      // Delete transaction
      await Transaction.findByIdAndDelete(req.query.id)
      if (!data) throw new Error(i18n.t("transactions.message.notFound"))

      res.json(data)
    } catch ({ message }) {
      res.status(500).send({ error: true, message })
    }
  }
}

export default apiHandler(handler)
