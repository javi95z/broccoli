import i18n from "i18next"
import bcrypt from "bcrypt"
import { User } from "../models"
import { generateNewToken } from "../utils/api-utils"
import apiHandler from "../middleware/api-handler"

// Sign up a new user
const handler = async (req, res) => {
  try {
    if (!req.body) throw new Error(i18n.t("signup.message.missingInformation"))
    const { email, password } = req.body
    const user = await User.create({
      email,
      password: bcrypt.hashSync(password, 10)
    })

    const token = generateNewToken(user._id)
    res.json({ token, email })
  } catch ({ message }) {
    res.status(500).send({ error: true, message })
  }
}

export default apiHandler(handler)
