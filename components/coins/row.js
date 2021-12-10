import Link from "next/link"
import { CardRoot, SignFigure } from "../shared"
import { currencyFormat, percentFormat } from "../../utils"
import settings from "../../settings.json"

/**
 * @param {Object} params
 * @param {Coin} params.data
 * @param {Number} params.itemNumber
 * @returns {JSX.Element}
 */
const CoinRow = ({ data, itemNumber }) => {
  const detailsUrl = `${settings.ROUTES.COINS}/${data.id}`

  return (
    <CardRoot>
      <div className="relative flex flex-row items-center w-full max-w-full h-14 px-4 py-2">
        {/* Rank */}
        <div className="flex w-2/12 hide-lg">
          <span className="font-extralight italic text-xl text-gray-400">
            #{itemNumber}
          </span>
        </div>

        {/* Coin */}
        <div className="flex flex-col leading-none w-6/12 lg:w-4/12">
          <Link href={detailsUrl}>
            <a>
              <div className="flex items-center space-x-4">
                <img src={data.image} width="30" height="30" />
                <div className="flex flex-col leading-none">
                  <span className="text-gray-500 font-normal uppercase text-xs">
                    {data.symbol}
                  </span>
                  <span className="truncate leading-tight">{data.name}</span>
                </div>
              </div>
            </a>
          </Link>
        </div>

        {/* Value and percent change */}
        <div className="flex justify-end items-center w-6/12">
          <div className="w-1/2 text-right">
            <span className="font-medium">{currencyFormat(data.price)}</span>
          </div>
          <div className="w-1/2 text-right">
            <SignFigure
              className="font-normal truncate"
              data={data.percent_change_24h}
              filter={percentFormat}
            />
          </div>
        </div>
      </div>
    </CardRoot>
  )
}

export default CoinRow
