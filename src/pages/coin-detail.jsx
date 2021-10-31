import { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { useTranslation } from "react-i18next"
import { AppLayout, Content } from "../components/layout"
import { BackgroundImage, SectionTitle } from "../components/shared"
import { TransactionList } from "../components/transactions"
import { isEmpty, currencyFormat, getTimeAgo } from "../utils"
import { useGetCoin } from "../services"
import settings from "../settings.json"

const CoinDetailPage = () => {
  const [t] = useTranslation()
  const { id } = useParams()
  const coinSvc = useGetCoin(id)
  const [data, setData] = useState({})
  const history = useHistory()

  const fetchData = async () => {
    const response = await coinSvc.attemptRequest()
    response.error ? history.push(settings.ROUTES.NOT_FOUND) : setData(response)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  return (
    <AppLayout>
      <Content isError={isEmpty(data)} isLoading={coinSvc.loading}>
        <section className="flex flex-col gap-6 h-full">
          {/* Logo, name and symbol */}
          <div className="flex justify-between">
            <div className="flex items-end">
              {data.image && (
                <img src={data.image} className="mr-3" width={32} />
              )}
              <h1 className="text-3xl">{data.name}</h1>
              <span className="flex self-auto rounded font-mono text-gray-400 bg-gray-700 text-xs py-1 px-2 ml-3">
                {data.symbol}
              </span>
            </div>
            <span className="font-extralight italic text-xl text-gray-400">{`#${data.rank}`}</span>
          </div>

          {/* Price info and last updated */}
          <div className="flex justify-between z-10">
            <span className="text-7xl font-extralight">
              {currencyFormat(data.price)}
            </span>
            {data.updatedAt && (
              <div className="flex flex-col text-right">
                <p className="leading-none ">Last updated</p>
                <time className="text-sm" dateTime={data.updatedAt}>
                  {getTimeAgo(data.updatedAt)}
                </time>
              </div>
            )}
          </div>

          {/* Transactions */}
          <Content>
            {!isEmpty(data.transactions) && (
              <div className="flex flex-col z-10">
                <SectionTitle>{t("transactions.title")}</SectionTitle>
                <TransactionList data={data.transactions} />
              </div>
            )}
          </Content>
          <BackgroundImage image={undefined} width={100} height={100} />
        </section>
      </Content>
    </AppLayout>
  )
}

export default CoinDetailPage