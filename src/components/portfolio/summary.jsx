import { useSelector } from "react-redux"
import { currencyFormat, percentFormat } from "../../utils"
import { CardRoot, Loader, SignFigure } from "../shared"

const PortfolioSummary = () => {
  const { data, loading } = useSelector(state => state.portfolio)

  return (
    <CardRoot>
      <div className="flex flex-col justify-center items-center w-full h-full">
        {loading ? (
          <Loader />
        ) : (
          <>
            <span className="text-6xl font-thin">
              {currencyFormat(data.totals?.amount)}
            </span>
            <div className="space-x-6 mt-2">
              <SignFigure
                className="text-lg truncate"
                data={data.totals?.balance}
                filter={currencyFormat}
                withSymbol
              />
              <SignFigure
                className="text-lg font-bold truncate"
                data={data.totals?.percentage}
                filter={percentFormat}
              />
            </div>
          </>
        )}
      </div>
    </CardRoot>
  )
}

export default PortfolioSummary
