import i18n from "i18next"
import apiHandler from "../middleware/api-handler"

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    // Remove transaction
    try {
      const data = await Transaction.findByIdAndDelete(req.query.id)
      if (!data) throw new Error(i18n.t("transactions.message.notFound"))

      // Update holding
      // req.body = {
      //   type: data.type === "buy" ? "sell" : "buy",
      //   amount: data.amount,
      //   coin: data.coin,
      //   price: data.price,
      // }
      // await update(req, res)

      res.json(data)
    } catch ({ message }) {
      res.status(500).send({ error: true, message })
    }
  }
}

export default apiHandler(handler)
