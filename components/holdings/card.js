import Link from "next/link"
import { useTranslation } from "react-i18next"
import { BackgroundImage, CardRoot, SignFigure } from "../shared"
import { cryptoFormat, currencyFormat, percentFormat } from "../../utils"
import settings from "../../settings.json"

/**
 * @param {Object} params
 * @param {Holding} params.data
 * @returns {JSX.Element}
 */
const HoldingCard = ({ data }) => {
  const [t] = useTranslation()

  return (
    <CardRoot>
      <div className="relative flex flex-col justify-between gap-6 w-full h-36 p-4 overflow-hidden">
        <BackgroundImage image={data.coin.image} width={70} height={70} />
        <div className="flex justify-between">
          <Link href={`${settings.ROUTES.COINS}/${data.coin.id}`}>
            <a>
              <div className="flex flex-col">
                <span className="text-lg">{data.coin.name}</span>
                <span className="text-gray-500 font-mono leading-none uppercase text-xs">
                  {data.coin.symbol}
                </span>
              </div>
            </a>
          </Link>
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
          <span className="text-xs font-medium uppercase text-gray-500">
            {t("holdings.totalValue")}
          </span>
          <span className="text-lg text-gray-400 -mt-1">
            {currencyFormat(data.totalValue)}
          </span>
        </div>
      </div>
    </CardRoot>
  )
}

export default HoldingCard
