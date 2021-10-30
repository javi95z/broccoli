import { Link } from "react-router-dom"
import { percentFormat } from "../../utils"
import settings from "../../settings.json"

const PortfolioRow = ({ data }) => {
  const detailsUrl = `${settings.ROUTES.COINS}/${data.coin.id}`

  return (
    <div className="flex justify-between items-center p-1 py-2">
      <Link to={detailsUrl}>
        <div className="flex">
          <img src={data.coin?.image} width={25} height={25} />
          <div className="truncate ml-2">
            <span className="font-mono text-sm text-gray-400">
              {data.coin?.symbol}
            </span>
            <span className="text-sm ml-2">{data.coin?.name}</span>
          </div>
        </div>
      </Link>
      <span className="font-medium tracking-tight">
        {percentFormat(data.percentage, false, false)}
      </span>
    </div>
  )
}

export default PortfolioRow
