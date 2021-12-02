import jwt from "jsonwebtoken"

// Routes where token should not be handled
const ROUTE_EXCEPTIONS = [
  "/api/auth/signin",
  "/api/auth/signup",
  "/api/auth/signout",
  "/api/auth/google"
]

const jwtHandler = (req, res) => {
  if (handleAuthRoutes(req.url)) return true

  const authHeader = req.headers["authorization"]
  if (handleTokenAbsence(authHeader))
    return res.status(403).send({ message: "Unauthorized" })

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
 * Check if route is among the exceptions
 * @param {String} url
 * @returns {Boolean}
 */
const handleAuthRoutes = url => ROUTE_EXCEPTIONS.includes(url)

/**
 * Check if token is absent or wrongly formatted
 * @param {String} header
 * @returns {Boolean}
 */
const handleTokenAbsence = header => !header || !header.startsWith("Bearer ")
