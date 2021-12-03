import i18n from "i18next"
import bcrypt from "bcrypt"
import { User } from "../models"
import { generateNewToken } from "../utils/api-utils"
import apiHandler from "../middleware/api-handler"

// Sign in a user
const handler = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) throw new Error(i18n.t("login.message.userNotFound"))

    if (!bcrypt.compareSync(password, user.password))
      throw new Error(i18n.t("login.message.passwordInvalid"))

    const token = generateNewToken(user._id)
    const result = { ...user.toJSON(), token }
    res.json(result)
  } catch ({ message }) {
    res.status(500).send({ message })
  }
}

export default apiHandler(handler)
