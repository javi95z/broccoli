import jwtHandler from "./jwt-handler"
import errorHandler from "./error-handler"

const apiHandler = handler => {
  return async (req, res) => {
    try {
      await jwtHandler(req, res)
      await handler(req, res)
    } catch (err) {
      errorHandler(err, res)
    }
  }
}

export default apiHandler
