import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { AppLayout } from "../components/layout"
import Content from "../components/layout/content"
import FabButton from "../components/fab-button"
import { TransactionRow } from "../components/transactions"
import { HoldingCard } from "../components/holdings"
import { useGetPositions } from "../services/positions"
import HoldingTile from "../components/holdings/tile"

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
        <section>
        <h1 className="page-title">{t("holdings.title")}</h1>
        <Content>
          <div className="flex gap-3">
            <div className="flex w-1/3">
              <HoldingCard
                data={{
                  name: "Bitcoin",
                  symbol: "BTC",
                  price: "54849.23",
                  image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
                  amount: "0.0035",
                  percentageDiff: "34.23"
                }}
              />
            </div>
            <div className="flex w-1/3">
              <HoldingCard
                data={{
                  name: "Ethereum",
                  symbol: "ETH",
                  price: "3100.19",
                  image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
                  amount: "0.05",
                  percentageDiff: "17.81"
                }}
              />
            </div>
            <div className="flex w-1/3">
              <HoldingCard
                data={{
                  name: "Cardano",
                  symbol: "ADA",
                  price: "2.67",
                  image: "https://cryptologos.cc/logos/cardano-ada-logo.png",
                  amount: "210",
                  percentageDiff: "26.91"
                }}
              />
            </div>
          </div>
        </Content>
        </section>
        <section className="mt-8">
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
        </section>

        <FabButton onClick={() => history.push("/add-transaction")} />
      </Content>
    </AppLayout>
  )
}

export default Dashboard
