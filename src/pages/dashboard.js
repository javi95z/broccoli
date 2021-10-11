import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { AppLayout } from "../components/layout"
import Content from "../components/layout/content"
// import { TransactionModal } from "../components/modals"
import FabButton from "../components/fab-button"
import { TransactionRow } from "../components/transactions"
import { useGetPositions } from "../services/positions"

const Dashboard = () => {
  const fetchData = useGetPositions()
  const transactionsSvc = useSelector(state => state.transactions)
  const history = useHistory()

  const onInit = async () => {
    await fetchData()
  }

  useEffect(() => {
    onInit()
  }, [])

  return (
    <AppLayout>
      <Content>
        <h1 className="page-title">Holdings</h1>
        <Content></Content>
        <h1 className="page-title">Latest transactions</h1>
        <Content
          isError={!transactionsSvc.data?.length}
          isLoading={transactionsSvc.loading}
          errorText={"You have no transactions"}
        >
          {/* Open positions */}
          <div className="flex flex-col gap-2 min-w-min my-6">
            {transactionsSvc.data.map((p, i) => (
              <TransactionRow key={i} data={p} hasStatus={false} />
            ))}
          </div>
        </Content>

        <FabButton onClick={() => history.push("/add-transaction")} />
      </Content>
    </AppLayout>
  )
}

export default Dashboard
