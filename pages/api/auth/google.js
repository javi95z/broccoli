import { User } from "../models"
import { generateNewToken } from "../utils/api-utils"
import apiHandler from "../middleware/api-handler"

const handler = async (req, res) => {
  const { body } = req
  try {
    const existingUser = await User.findOne({ email: body.email })
    if (existingUser) {
      // Log in existing user
      const token = generateNewToken(existingUser._id)
      const response = { ...existingUser.toJSON(), token }
      console.log(response, "response")
      res.send({ ...existingUser.toJSON(), token })
    } else {
      // Create new user
      const user = await User.create(body)
      const token = generateNewToken(user._id)
      console.log({ ...user.toJSON(), token }, "res")
      res.json({ ...user.toJSON(), token })
    }
  } catch ({ message }) {
    res.status(500).send({ error: true, message })
  }
}

export default apiHandler(handler)
