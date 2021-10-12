import { cryptoFormat, currencyFormat } from "../../utils"
import BackgroundImage from "../background-image"

const HoldingTile = ({ data }) => (
  <div className="relative flex flex-col gap-6 w-full h-24 rounded-md shadow-md p-4 bg-gray-900 overflow-hidden">
    <BackgroundImage image={data.image} width={50} height={50} />
    <div className="flex justify-between">
      <span className="text-lg font-medium">
        {cryptoFormat(data.amount, data.symbol)}
      </span>
      <span className="font-medium text-green-600">+ 129%</span>
    </div>
    <span className="text-gray-400 -mt-1">{currencyFormat(data.price)}</span>
  </div>
)

export default HoldingTile
