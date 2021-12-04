import Link from "next/link"
import { percentFormat } from "../../utils"
import settings from "../../settings.json"

/**
 * @typedef {Object} PortfolioRow
 * @property {Coin} coin
 * @property {Number} percentage
 *
 * @param {Object} params
 * @param {PortfolioRow} params.data
 * @returns {JSX.Element}
 */
const PortfolioRow = ({ data }) => {
  const detailsUrl = `${settings.ROUTES.COINS}/${data.coin.id}`

  return (
    <div className="flex justify-between items-center p-1 py-2">
      <Link href={detailsUrl}>
        <a>
          <div className="flex">
            <img src={data.coin?.image} width={25} height={25} />
            <div className="truncate ml-2">
              <span className="font-mono text-sm text-gray-400">
                {data.coin?.symbol}
              </span>
              <span className="text-sm ml-2">{data.coin?.name}</span>
            </div>
          </div>
        </a>
      </Link>
      <span className="font-medium tracking-tight">
        {percentFormat(data.percentage, false, false)}
      </span>
    </div>
  )
}

export default PortfolioRow
