import { CardRoot } from "../shared"

const PortfolioSummary = () => (
  <CardRoot>
    <div className="flex flex-col justify-center items-center w-full h-full">
      <span className="text-5xl font-thin">$2,932.43</span>
      <div className="space-x-6 mt-2">
        <span className="text-lg text-green-600">+ $1,023</span>
        <span className="text-lg font-bold text-green-600">+ 23.41%</span>
      </div>
    </div>
  </CardRoot>
)

export default PortfolioSummary
