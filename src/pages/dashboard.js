import { useState } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { AppLayout, Content } from "../components/layout"
import FabButton from "../components/fab-button"
import { TransactionList } from "../components/transactions"
import { HoldingList } from "../components/holdings"
import { PortfolioBreakdown, PortfolioSummary } from "../components/portfolio"
import { SectionTitle } from "../components/shared"
import { TransactionModal } from "../components/modals"
import { isEmpty } from "../utils"

const DashboardPage = () => {
  const [t] = useTranslation()
  const [showTransactionModal, setTransactionModal] = useState(false)
  const transactions = useSelector(state => state.transactions)
  const holdings = useSelector(state => state.holdings)
  const portfolio = useSelector(state => state.portfolio)

  return (
    <AppLayout>
      {/* Portfolio section */}
      <section>
        <SectionTitle>{t("portfolio.title")}</SectionTitle>
        <div className="flex flex-col md:flex-row gap-4 my-6">
          <div className="flex h-60 w-full justify-center">
            <PortfolioSummary />
          </div>
          {portfolio.data.breakdown && (
            <div className="flex md:h-60 w-full justify-center md:w-2/5">
              <PortfolioBreakdown />
            </div>
          )}
        </div>
      </section>
      {/* Holdings section */}
      <section className="mt-8">
        <SectionTitle>{t("holdings.title")}</SectionTitle>
        <Content
          isError={isEmpty(holdings.data)}
          isLoading={holdings.loading}
          errorText={t("holdings.errors.none")}
        >
          <div className="space-y-4 my-6">
            <HoldingList data={holdings.data} />
          </div>
        </Content>
      </section>
      {/* Transactions section */}
      <section className="mt-8">
        <SectionTitle>{t("transactions.latest")}</SectionTitle>
        <Content
          isError={isEmpty(transactions.data)}
          isLoading={transactions.loading}
          errorText={t("transactions.errors.none")}
        >
          <TransactionList data={transactions.data} />
        </Content>
      </section>

      <FabButton onClick={() => setTransactionModal(true)} />

      <TransactionModal
        show={showTransactionModal}
        onClose={() => setTransactionModal(false)}
      />
    </AppLayout>
  )
}

export default DashboardPage
