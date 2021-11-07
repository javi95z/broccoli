import jwt from "jsonwebtoken"

const ROUTE_EXCEPTIONS = [
  "/api/auth/signin",
  "/api/auth/signup",
  "/api/auth/signout"
]

const jwtHandler = (req, res) => {
  if (handleAuthRoutes(req.url)) return true

  const authHeader = req.headers["authorization"]
  if (handleTokenPresence(authHeader))
    return res.status(403).send({ error: "Unauthorized" })

  const [_, token] = authHeader.split(" ")
  jwt.verify(token, process.env.jwtsecret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: true, message: "Invalid token" })
    }
    req.userId = decoded.id
    return true
  })
}

export default jwtHandler

/**
 * @param {String} url
 * @returns {Boolean}
 */
const handleAuthRoutes = url => ROUTE_EXCEPTIONS.includes(url)

/**
 * @param {String} header
 * @returns {Boolean}
 */
const handleTokenPresence = header => !header || !header.startsWith("Bearer ")
