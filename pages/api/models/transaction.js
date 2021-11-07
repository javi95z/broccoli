import mongoose from "mongoose"

const transaction = new mongoose.Schema(
  {
    coin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coin",
      required: [true, "Coin is required"]
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"]
    },
    type: { type: String, required: [true, "Type of transaction is required"] },
    date: { type: Date, default: Date.now },
    price: { type: Number, required: [true, "Price is required"] },
    amount: Number
  },
  { timestamps: true }
)

global.Transaction =
  global.Transaction || mongoose.model("Transaction", transaction)

export default global.Transaction
