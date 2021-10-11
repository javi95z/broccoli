import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { AppLayout } from "../components/layout"
import Content from "../components/layout/content"
import FabButton from "../components/fab-button"
import { TransactionRow } from "../components/transactions"
import { useGetPositions } from "../services/positions"

const Dashboard = () => {
  const [t] = useTranslation()
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
        <h1 className="page-title">{t("holdings.title")}</h1>
        <Content></Content>
        <h1 className="page-title">{t("transactions.latest")}</h1>
        <Content
          isError={!transactionsSvc.data?.length}
          isLoading={transactionsSvc.loading}
          errorText={t("transactions.errors.none")}
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
