import { HoldingCard } from "."

/**
 * @param {Object} params
 * @param {Holding[]} params.data
 * @returns {JSX.Element}
 */
const HoldingList = ({ data }) => {
  if (!data) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((item, index) => (
        <HoldingCard key={index} data={item} />
      ))}
    </div>
  )
}

export default HoldingList
