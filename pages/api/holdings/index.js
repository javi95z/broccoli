import i18n from "i18next"
import apiHandler from "../middleware/api-handler"
import { Holding } from "../models"
import { populateCoin } from "../utils/populate"
import { sortData } from "../utils/api-utils"
import { mutateHoldingsArray } from "../utils/helpers"

// Get holdings by owner
const getHoldings = async (req, res) => {
  try {
    const query = { owner: req.userId, amount: { $gt: 0 } }
    const data = await Holding.find(query).populate("coin", populateCoin).lean()

    if (!data) throw new Error(i18n.t("common.errors.notFound"))
    if (!data.length) {
      return res.send([])
    }

    // Mutate and sort data
    const mutated = mutateHoldingsArray(data)
    const sorted = sortData(mutated, "totalValue", "desc")
    res.json(sorted)
  } catch ({ message }) {
    res.status(500).send({ error: true, message })
  }
}

export default apiHandler(getHoldings)
