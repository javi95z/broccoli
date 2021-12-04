import mongoose from "mongoose"

const coin = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    symbol: {
      type: String,
      required: true
    },
    rank: Number,
    image: String,
    price: Number,
    volume_24h: Number,
    ath_price: Number,
    ath_date: Date
  },
  { timestamps: true }
)

global.Coin = global.Coin || mongoose.model("Coin", coin)

export default global.Coin
