import mongoose from "mongoose"

const holding = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Owner is required"]
  },
  coin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coin",
    required: [true, "Coin is required"]
  },
  amount: {
    type: Number,
    required: true
  },
  averagePrice: {
    type: Number,
    required: true
  }
})

global.Holding = global.Holding || mongoose.model("Holding", holding)

export default global.Holding
