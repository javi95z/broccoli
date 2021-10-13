const PortfolioRow = ({ data }) => {
  return (
    <div className="flex justify-between items-center p-1 py-2">
      <div className="flex">
        <img src={data.image} width={25} height={25} />
        <div className="ml-2">
          <span className="font-mono text-sm text-gray-400">{data.symbol}</span>
          <span className="text-sm ml-2">{data.name}</span>
        </div>
      </div>
      <span className="font-thin">{data.percentage}%</span>
    </div>
  )
}

export default PortfolioRow
