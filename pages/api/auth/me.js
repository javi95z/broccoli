import { User } from "../models"
import apiHandler from "../middleware/api-handler"

// Retrieve logged in user details
const handler = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    res.json(user)
  } catch ({ message }) {
    res.status(500).send({ error: true, message })
  }
}

export default apiHandler(handler)
