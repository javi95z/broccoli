import mongoose from "mongoose"

const user = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: { unique: true }
    },
    password: String,
    fullname: String,
    nationality: String,
    birthday: String,
    avatar: String
  },
  { timestamps: true }
)

user.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.password
    delete ret.createdAt
    delete ret.updatedAt
    delete ret.__v
  }
})

user.post("save", (error, doc, next) => {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error(`User ${doc.email} already exists`))
  } else {
    next()
  }
})

global.User = global.User || mongoose.model("User", user)

export default global.User
