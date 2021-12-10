import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { AppLayout, Content } from "../components/layout"
import { CoinRow } from "../components/coins"
import { SectionTitle, SubsectionTitle } from "../components/shared"
import { useBiggestGainers } from "../services/explore"
import { isEmpty } from "../utils"

const ExplorePage = () => {
  const [t] = useTranslation()
  const [data, setData] = useState({ gainers: [], losers: [] })
  const gainersSvc = useBiggestGainers()

  const fetchData = async () => {
    /** @type {Coin[]} */
    const gainers = await gainersSvc.performRequest()
    setData(prev => ({ ...prev, gainers }))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <AppLayout>
      <section>
        <SectionTitle>{t("explore.title")}</SectionTitle>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Biggest gainers */}
          <div className="flex flex-col gap-2 md:w-1/2">
            <SubsectionTitle
              title={t("explore.biggestGainers")}
              subtitle="Last 24 hours"
            />
            <Content
              isError={isEmpty(data.gainers)}
              isLoading={gainersSvc.loading}
              illustration="/images/illustrations/data-analyzing.png"
              errorText={t("common.errors.notLoaded")}
            >
              {data.gainers?.map((coin, index) => (
                <CoinRow key={index} itemNumber={index + 1} data={coin} />
              ))}
            </Content>
          </div>

          {/* Biggest losers */}
          <div className="flex flex-col gap-2 md:w-1/2">
            <SubsectionTitle
              title={t("explore.biggestLosers")}
              subtitle="Last 24 hours"
            />
            <Content
              isError={isEmpty(data.losers)}
              isLoading={gainersSvc.loading}
              illustration="/images/illustrations/data-analyzing.png"
              errorText={t("common.errors.notLoaded")}
            >
              {data.losers?.map((coin, index) => (
                <CoinRow key={index} itemNumber={index + 1} data={coin} />
              ))}
            </Content>
            {/* <CoinRow
              itemNumber={1}
              data={{
                symbol: "BTC",
                name: "Bitcoin",
                price: 48000.23,
                percent_change_24h: "-23.3",
                image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png"
              }}
            />
            <CoinRow
              itemNumber={2}
              data={{
                symbol: "ETH",
                name: "Ethereum",
                price: 3500,
                percent_change_24h: -17.34,
                image: "https://cryptologos.cc/logos/ethereum-eth-logo.png"
              }}
            />
            <CoinRow
              itemNumber={3}
              data={{
                symbol: "ADA",
                name: "Cardano",
                price: 2.54,
                percent_change_24h: -12.32,
                image: "https://cryptologos.cc/logos/cardano-ada-logo.png"
              }}
            />
            <CoinRow
              itemNumber={4}
              data={{
                symbol: "DOT",
                name: "Polkadot",
                price: 31.92,
                percent_change_24h: -9.23,
                image: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png"
              }}
            />
            <CoinRow
              itemNumber={5}
              data={{
                symbol: "BNB",
                name: "Binance Coin",
                price: 432.58,
                percent_change_24h: -3.54,
                image: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png"
              }}
            /> */}
          </div>
        </div>
      </section>
    </AppLayout>
  )
}

export default ExplorePage
