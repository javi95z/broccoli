import { BackgroundImage, CardRoot, SignFigure } from "../shared"
import { cryptoFormat, currencyFormat, percentFormat } from "../../utils"
import settings from "../../settings.json"

const HoldingCard = ({ data }) => {
  const link = data.id && `${settings.ROUTES.COINS}/${data.id}`

  return (
    <CardRoot>
      <div className="relative flex flex-col gap-6 w-full h-36 p-4 overflow-hidden">
        <BackgroundImage
          image={data.image}
          width={70}
          height={70}
          link={link}
        />

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
            {currencyFormat(data.price)}
          </span>
        </div>
      </div>
    </CardRoot>
  )
}

export default HoldingCard
