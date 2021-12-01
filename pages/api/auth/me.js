import { User } from "../models"
import apiHandler from "../middleware/api-handler"

const handler = async (req, res) => {
  const { userId, method, body } = req
  if (method === "PUT") {
    // Update user details
    try {
      const user = await User.findByIdAndUpdate(userId, body, {
        new: true
      })
      res.json(user)
    } catch ({ message }) {
      res.status(500).send({ error: true, message })
    }
  } else if (method === "GET") {
    // Retrieve logged in user details
    try {
      const user = await User.findById(userId)
      res.json(user)
    } catch ({ message }) {
      res.status(500).send({ error: true, message })
    }
  }
}

export default apiHandler(handler)
