import { cryptoFormat, currencyFormat, percentFormat } from "../../utils"
import { BackgroundImage, CardRoot, SignFigure } from "../shared"
import settings from "../../settings.json"

/**
 * @param {Object} params
 * @param {Holding} params.data
 * @returns {JSX.Element}
 */
const HoldingTile = ({ data }) => {
  const link = data._id && `${settings.ROUTES.COINS}/${data._id}`

  return (
    <CardRoot>
      <div className="relative flex flex-col gap-6 w-full h-24 p-4 overflow-hidden">
        <BackgroundImage
          image={data.coin.image}
          width={50}
          height={50}
          link={link}
        />

        <div className="flex justify-between">
          <span className="text-lg font-medium">
            {cryptoFormat(data.amount, data.coin.symbol)}
          </span>
          <SignFigure
            data={data.percentageDiff}
            filter={percentFormat}
            className="font-medium"
          />
        </div>
        <span className="text-gray-400 -mt-1">
          {currencyFormat(data.coin.price)}
        </span>
      </div>
    </CardRoot>
  )
}

export default HoldingTile
