import { TransactionRow } from "./"

const TransactionList = ({ data }) => {
  if (!data) return null

  return (
    <div className="flex flex-col gap-2 my-6">
      {data.map((p, i) => (
        <TransactionRow key={i} data={p} />
      ))}
    </div>
  )
}

export default TransactionList
