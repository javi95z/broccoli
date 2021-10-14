import { PortfolioRow } from "./"
import { CardRoot } from "../shared"

const SummaryPercent = () => {
  return (
    <CardRoot>
      <div className="flex flex-col justify-center divide-y divide-gray-800 divide-dashed py-2 px-4 overflow-auto h-full w-full">
        <PortfolioRow
          data={{
            symbol: "BTC",
            name: "Bitcoin",
            percentage: "22",
            image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png"
          }}
        />
        <PortfolioRow
          data={{
            symbol: "ADA",
            name: "Cardano",
            percentage: "18",
            image: "https://cryptologos.cc/logos/cardano-ada-logo.png"
          }}
        />
        <PortfolioRow
          data={{
            symbol: "DOT",
            name: "Polkadot",
            percentage: "14",
            image: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png"
          }}
        />
        <PortfolioRow
          data={{
            symbol: "BNB",
            name: "Binance Coin",
            percentage: "12",
            image: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png"
          }}
        />
        <PortfolioRow
          data={{
            symbol: "ETH",
            name: "Ethereum",
            percentage: "9",
            image: "https://cryptologos.cc/logos/ethereum-eth-logo.png"
          }}
        />
      </div>
    </CardRoot>
  )
}

export default SummaryPercent
