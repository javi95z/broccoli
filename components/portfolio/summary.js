import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { currencyFormat, isEmpty, percentFormat } from "../../utils"
import { Content } from "../layout"
import { CardRoot, SignFigure } from "../shared"

/**
 * @returns {JSX.Element}
 */
const PortfolioSummary = () => {
  const [t] = useTranslation()
  /** @type {SelectorPortfolio} */
  const { data, loading, error } = useSelector(state => state.portfolio)

  return (
    <Content
      isError={isEmpty(data)}
      errorText={error || t("portfolio.message.none")}
      illustration="/images/illustrations/wallet.png"
      isLoading={loading}
    >
      <CardRoot>
        <div className="flex flex-col justify-center items-center w-full h-full">
          <span className="text-6xl font-thin">
            {currencyFormat(data?.totals?.amount)}
          </span>
          <div className="space-x-6 mt-2">
            <SignFigure
              className="text-lg truncate"
              data={data?.totals?.balance}
              filter={currencyFormat}
              withSymbol
            />
            <SignFigure
              className="text-lg font-bold truncate"
              data={data?.totals?.percentage}
              filter={percentFormat}
            />
          </div>
        </div>
      </CardRoot>
    </Content>
  )
}

export default PortfolioSummary
