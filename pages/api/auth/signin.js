import bcrypt from "bcrypt"
import { User } from "../models"
import { generateNewToken } from "../utils/api-utils"
import apiHandler from "../middleware/api-handler"

// Sign in a user
const handler = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) throw new Error("User not found")

    if (!bcrypt.compareSync(password, user.password))
      throw new Error("Invalid password")

    const token = generateNewToken(user._id)
    const result = { ...user.toJSON(), token }
    res.json(result)
  } catch ({ message }) {
    res.status(500).send({ message })
  }
}

export default apiHandler(handler)
