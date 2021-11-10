import mongoose from "mongoose"
import jwtHandler from "./jwt-handler"
import errorHandler from "./error-handler"

const connect = async () => {
  await mongoose.connect(process.env.mongodburl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
}

const apiHandler = handler => {
  const [connections] = mongoose.connections
  !connections.readyState && connect()

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
