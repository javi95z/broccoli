import { HoldingCard } from "./"

const HoldingList = ({ data }) => {
  if (!data) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((p, i) => (
        <HoldingCard key={i} data={p} />
      ))}
    </div>
  )
}

export default HoldingList
