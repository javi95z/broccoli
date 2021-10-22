import { BackgroundImage, CardRoot, SignFigure } from "../shared"
import { cryptoFormat, currencyFormat, percentFormat } from "../../utils"
import settings from "../../settings.json"

const HoldingCard = ({ data }) => {
  const link = data.coin.id && `${settings.ROUTES.COINS}/${data.coin.id}`

  return (
    <CardRoot>
      <div className="relative flex flex-col justify-between gap-6 w-full h-36 p-4 overflow-hidden">
        <BackgroundImage
          image={data.coin.image}
          width={70}
          height={70}
          link={link}
        />

        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-lg">{data.coin.name}</span>
            <span className="text-gray-500 font-mono leading-none uppercase text-xs">
              {data.coin.symbol}
            </span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-xl font-medium">
              {cryptoFormat(data.amount, data.coin.symbol)}
            </span>
            <SignFigure
              data={data.percentageDiff}
              filter={percentFormat}
              className="font-medium"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 font-normal uppercase text-xs">
            Current price
          </span>
          <span className="text-gray-400 -mt-1">
            {currencyFormat(data.coin.price)}
          </span>
        </div>
      </div>
    </CardRoot>
  )
}

export default HoldingCard
