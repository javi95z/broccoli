import { useSelector } from "react-redux"
import { currencyFormat } from "../../utils"
import { CardRoot, Loader } from "../shared"

const PortfolioSummary = () => {
  const portfolio = useSelector(state => state.portfolio)

  return (
    <CardRoot>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <span className="text-5xl font-thin">
          {portfolio.loading ? (
            <Loader />
          ) : (
            currencyFormat(portfolio.data.totalValue)
          )}
        </span>
        <div className="space-x-6 mt-2">
          <span className="text-lg text-green-600">+ $1,023</span>
          <span className="text-lg font-bold text-green-600">+ 23.41%</span>
        </div>
      </div>
    </CardRoot>
  )
}

export default PortfolioSummary
