import i18n from "i18next"
import { Coin } from "../models"
import apiHandler from "../middleware/api-handler"

// Get explore information
const handler = async (req, res) => {
  try {
    //! TODO: Change volume_24h to percent_change_24h
    const data = await Coin.find({}).sort({ volume_24h: -1 }).limit(5).lean()

    if (!data) throw new Error(i18n.t("common.errors.notFound"))

    res.json(data)
  } catch ({ message }) {
    res.status(500).send({ error: true, message })
  }
}

export default apiHandler(handler)
