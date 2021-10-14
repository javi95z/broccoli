import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { AppLayout, Content } from "../components/layout"
import FabButton from "../components/fab-button"
import { TransactionRow } from "../components/transactions"
import { HoldingCard, HoldingTile } from "../components/holdings"
import { PortfolioBreakdown, PortfolioSummary } from "../components/portfolio"
import { SectionTitle } from "../components/shared"
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
        {/* Portfolio section */}
        <section>
          <h1 className="page-title">{t("portfolio.title")}</h1>
          <div className="flex gap-4 my-6">
            <div className="flex h-60 w-2/3">
              <PortfolioSummary />
            </div>
            <div className="flex h-60 w-1/3">
              <PortfolioBreakdown />
            </div>
          </div>
        </section>
        {/* Holdings section */}
        <section className="mt-8">
          <SectionTitle>{t("holdings.title")}</SectionTitle>
          <Content>
            <div className="space-y-4 my-6">
              <div className="grid grid-cols-3 gap-4">
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
              <div className="grid grid-cols-4 gap-4">
                <HoldingTile
                  data={{
                    symbol: "BNB",
                    price: "398.38",
                    amount: "0.78",
                    percentageDiff: "129",
                    image:
                      "https://cryptologos.cc/logos/binance-coin-bnb-logo.png"
                  }}
                />
                <HoldingTile
                  data={{
                    symbol: "DOT",
                    price: "33.56",
                    amount: "8.15",
                    percentageDiff: "-14.32",
                    image:
                      "https://cryptologos.cc/logos/polkadot-new-dot-logo.png"
                  }}
                />
                <HoldingTile
                  data={{
                    symbol: "LTC",
                    price: "130.93",
                    amount: "2.59",
                    percentageDiff: "32.4",
                    image: "https://cryptologos.cc/logos/litecoin-ltc-logo.png"
                  }}
                />
              </div>
            </div>
          </Content>
        </section>
        {/* Transactions section */}
        <section className="mt-8">
          <SectionTitle>{t("transactions.latest")}</SectionTitle>
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
