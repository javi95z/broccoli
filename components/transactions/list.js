import { TransactionRow } from "./"

/**
 * @param {Object} params
 * @param {Transaction[]} params.data
 * @returns {JSX.Element}
 */
const TransactionList = ({ data }) => {
  if (!data) return null

  return (
    <div className="flex flex-col gap-2 my-6">
      {data.map((item, index) => (
        <TransactionRow key={index} data={item} />
      ))}
    </div>
  )
}

export default TransactionList
