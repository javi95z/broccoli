import { useState } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { AppLayout, Content } from "../components/layout"
import { TransactionList } from "../components/transactions"
import { HoldingList } from "../components/holdings"
import { PortfolioBreakdown, PortfolioSummary } from "../components/portfolio"
import { SectionTitle, FabButton } from "../components/shared"
import { TransactionModal } from "../components/modals"
import { AddIcon } from "../components/icons"
import { isEmpty } from "../utils"

const DashboardPage = () => {
  const [t] = useTranslation()
  const [showTransactionModal, setTransactionModal] = useState(false)
  /**
   * @type {{
   * transactions: SelectorTransactions,
   * holdings: SelectorHoldings,
   * portfolio: SelectorPortfolio
   * }}
   */
  const { transactions, holdings, portfolio } = useSelector(state => state)

  return (
    <AppLayout>
      {/* Portfolio section */}
      <section>
        <SectionTitle>{t("portfolio.title")}</SectionTitle>
        <div className="flex flex-col md:flex-row gap-4 my-6">
          <div className="flex h-60 w-full justify-center">
            <PortfolioSummary />
          </div>
          {portfolio.data?.breakdown && (
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
          illustration="/images/illustrations/holdings.png"
          errorText={holdings.error || t("holdings.message.none")}
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
          illustration="/images/illustrations/transaction.png"
          errorText={transactions.error || t("transactions.message.none")}
        >
          <TransactionList data={transactions.data} />
        </Content>
      </section>

      <FabButton size="lg" onClick={() => setTransactionModal(true)}>
        <AddIcon width={38} className="on-hover-rotate" />
      </FabButton>

      <TransactionModal
        show={showTransactionModal}
        onClose={() => setTransactionModal(false)}
      />
    </AppLayout>
  )
}

export default DashboardPage
