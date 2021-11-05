import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Content } from "../layout"
import { PortfolioRow } from "./"
import { CardRoot } from "../shared"
import { isEmpty } from "../../utils"

/**
 * @returns {JSX.Element}
 */
const PortfolioBreakdown = () => {
  const [t] = useTranslation()
  /** @type {SelectorPortfolio} */
  const portfolio = useSelector(state => state.portfolio)

  return (
    <Content
      isLoading={portfolio.loading}
      isError={isEmpty(portfolio.data.breakdown)}
      errorText={t("portfolio.message.none")}
    >
      <CardRoot>
        <div className="flex flex-col justify-start divide-y divide-gray-800 divide-dashed py-3 px-4 overflow-auto h-full w-full">
          {portfolio.data.breakdown.map((item, index) => (
            <PortfolioRow key={index} data={item} />
          ))}
        </div>
      </CardRoot>
    </Content>
  )
}

export default PortfolioBreakdown
