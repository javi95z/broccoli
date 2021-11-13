import i18n from "i18next"
import apiHandler from "../middleware/api-handler"
import { Coin } from "../models"
import { getPaginationOffset } from "../utils/api-utils"

// Get coins data
const handler = async (req, res) => {
  const page = parseInt(req.query.page) || 0
  const size = parseInt(req.query.size) || 0
  if (!size) throw new Error(i18n.t("coins.message.unlimitedLoad"))
  const offset = getPaginationOffset(page, size)

  try {
    const query = { rank: { $gt: 0 } }
    const data = await Coin.find(query)
      .sort({ rank: 1 })
      .limit(size)
      .skip(parseInt(offset))
      .lean()

    if (!data) throw new Error(i18n.t("common.errors.notFound"))
    if (!data.length) {
      return res.send([])
    }

    res.json({ page, size: data.length, data })
  } catch ({ message }) {
    res.status(500).send({ error: true, message })
  }
}

export default apiHandler(handler)
