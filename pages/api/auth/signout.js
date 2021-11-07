import jwt from "jsonwebtoken"
import apiHandler from "../middleware/api-handler"

// Sign a user out of the application
const handler = async (req, res) => {
  const authHeader = req.headers["authorization"]
  jwt.sign(authHeader, "", { expiresIn: 1 }, (success, err) => {
    success
      ? res.json({ message: "You have been logged out" })
      : res.status(500).send({ error: true, message: "Error logging out" })
  })
}

export default apiHandler(handler)
