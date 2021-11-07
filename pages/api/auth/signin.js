import bcrypt from "bcrypt"
import { User } from "../models"
import { generateNewToken } from "../utils/api-utils"
import apiHandler from "../middleware/api-handler"

// Sign in a user
const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) throw new Error("User not found")

    if (!bcrypt.compareSync(req.body.password, user.password))
      throw new Error("Invalid password")

    const token = generateNewToken(user._id)
    const result = { ...user.toJSON(), token }
    res.json(result)
  } catch ({ message }) {
    res.status(500).send({ error: true, message })
  }
}

export default apiHandler(signIn)
