import apiHandler from "../middleware/api-handler"
import { removeEmpty } from "../utils/api-utils"
import { getTransactions } from "../_services"

// Get transactions
const handler = async (req, res) => {
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

export default apiHandler(handler)
