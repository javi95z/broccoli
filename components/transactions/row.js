import Link from "next/link"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { EyeIcon, TrashIcon, PencilIcon } from "../icons"
import Dropdown from "../dropdown"
import Tag from "../tag"
import { CardRoot, Overlay, SignFigure } from "../shared"
import { TransactionModal } from "../modals"
import { confirm, useDeleteTransaction } from "../../services"
import { percentFormat, currencyFormat, dateFormat } from "../../utils"
import settings from "../../settings.json"

/**
 * @param {Object} params
 * @param {Transaction} params.data
 * @param {Boolean} [params.hasStatus]
 * @returns {JSX.Element}
 */
const TransactionRow = ({ data, hasStatus = true }) => {
  const [t] = useTranslation()
  const [showTransactionModal, setTransactionModal] = useState(false)
  const detailsUrl = `${settings.ROUTES.COINS}/${data.coin.id}`
  const removeSvc = useDeleteTransaction(data._id)

  const Item = ({ title, value }) => (
    <>
      <span className="text-gray-500 font-normal uppercase text-xs">
        {title}
      </span>
      <span className="truncate leading-tight">{value}</span>
    </>
  )

  const removeElement = async () => {
    if (confirm(t("transactions.confirmRemoval"))) {
      await removeSvc.performRequest()
    }
  }

  return (
    <CardRoot>
      <div className="relative flex flex-row items-center w-full max-w-full h-14 px-4 py-2">
        {/* Deleting status overlay */}
        {removeSvc.loading && (
          <Overlay className="rounded-md font-normal">
            <TrashIcon width={25} className="animate-bounce" />
            <span className="ml-2">Deleting...</span>
          </Overlay>
        )}

        {/* Coin and link */}
        <div className="flex flex-col leading-none w-2/12 sm:w-3/12">
          <Link href={detailsUrl}>
            <a>
              <div className="flex items-center space-x-4">
                <img src={data.coin?.image} width="30" height="30" />
                <div className="flex items-center justify-between w-full hide-mobile">
                  {/* Coin and symbol */}
                  <div className="flex flex-col leading-none">
                    <Item title={data.coin.symbol} value={data.coin.name} />
                  </div>
                  {/* Amount */}
                  <Tag className="mr-4 hide-tablet">x{data.amount}</Tag>
                </div>
              </div>
            </a>
          </Link>
        </div>

        {/* Date */}
        <div className="flex flex-col leading-none hide-mobile w-2/12">
          <Item title={t("transactions.date")} value={dateFormat(data.date)} />
        </div>

        {/* Value and balance */}
        <div className="flex justify-between items-center w-6/12 sm:w-4/12">
          <div className="flex flex-col leading-none w-1/2">
            <Item
              title={t(`transactions.${data.type}Price`)}
              value={
                <span className="font-medium">
                  {currencyFormat(data.price)}
                </span>
              }
            />
          </div>
          <div className="flex flex-col leading-none w-1/2 text-right">
            <SignFigure
              className="font-medium truncate"
              data={data.percentageDiff}
              filter={percentFormat}
            />
            <SignFigure
              className="text-xs font-normal truncate"
              data={data.balanceDiff}
              filter={currencyFormat}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end items-center gap-2 w-4/12 sm:w-3/12">
          {hasStatus && data.type && (
            <Tag
              backgroundColor={settings.STATUS_COLORS[data.type]}
              className="uppercase mr-2"
            >
              {data.type}
            </Tag>
          )}
          <Dropdown
            items={[
              {
                icon: <EyeIcon width={18} />,
                className: "show-only-mobile",
                title: t("common.details"),
                action: () => {}
              },
              {
                icon: <PencilIcon width={18} />,
                title: t("common.edit"),
                action: () => setTransactionModal(true)
              },
              {
                icon: <TrashIcon width={18} />,
                className: "bg-red-900",
                title: t("common.remove"),
                action: removeElement
              }
            ]}
          />
        </div>
      </div>

      <TransactionModal
        show={showTransactionModal}
        data={data}
        onClose={() => setTransactionModal(false)}
      />
    </CardRoot>
  )
}

export default TransactionRow
