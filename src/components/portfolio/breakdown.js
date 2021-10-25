import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Content } from "../layout"
import { PortfolioRow } from "./"
import { CardRoot } from "../shared"
import { isEmpty } from "../../utils"

const PortfolioBreakdown = () => {
  const [t] = useTranslation()
  const portfolio = useSelector(state => state.portfolio)

  return (
    <Content
      isError={isEmpty(portfolio.breakdown)}
      errorText={t("holdings.errors.none")}
    >
      <CardRoot>
        <div className="flex flex-col justify-start divide-y divide-gray-800 divide-dashed py-3 px-4 overflow-auto h-full w-full">
          {portfolio.breakdown?.map((item, index) => (
            <PortfolioRow key={index} data={item} />
          ))}
        </div>
      </CardRoot>
    </Content>
  )
}

export default PortfolioBreakdown
