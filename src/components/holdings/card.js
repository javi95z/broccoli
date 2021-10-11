import { cryptoFormat, currencyFormat, percentFormat } from "../../utils"

const HoldingCard = ({ data }) => {
  return (
    <div className="relative flex flex-col gap-6 w-full rounded-md shadow-md p-4 bg-gray-900 overflow-hidden">
      <div className="absolute opacity-40 right-2 -bottom-3">
        <img src={data.image} width={70} height={70} />
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <div className="flex flex-col">
            <span className="text-gray-500 font-mono leading-none uppercase text-xs">
              {data.symbol}
            </span>
            <span className="text-lg">{data.name}</span>
          </div>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-xl font-medium">
            {cryptoFormat(data.amount, data.symbol)}
          </span>
          <span className="font-medium text-green-600">
            {percentFormat(data.percentageDiff)}
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-500 font-normal uppercase text-xs">
          Current price
        </span>
        <span className="text-gray-400 -mt-1">
          {currencyFormat(data.price)}
        </span>
      </div>
    </div>
  )
}

export default HoldingCard
