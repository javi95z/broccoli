import { useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"
import classNames from "classnames"
import { EyeIcon, TrashIcon, PencilIcon } from "../icons"
import Dropdown from "../dropdown"
import Tag from "../tag"
import { CardRoot, Overlay, SignFigure } from "../shared"
import { removeDataSuccess } from "../../slices/transactions"
import { useDeleteRequest } from "../../hooks"
import { percentFormat, currencyFormat, dateFormat } from "../../utils"
import settings from "../../settings.json"

const TransactionRow = ({
  data,
  hasStatus = true,
  hasCoinLink = true,
  hasDetailsButton = true
}) => {
  const [t] = useTranslation()
  const detailsUrl = `/coins/${data.coin.id}`
  const history = useHistory()
  const dispatch = useDispatch()
  const removeSvc = useDeleteRequest(settings.API_ROUTES.POSITIONS, data._id)

  const Item = ({ title, value }) => (
    <>
      <span className="text-gray-500 font-normal uppercase text-xs">
        {title}
      </span>
      <span>{value}</span>
    </>
  )

  const removeElement = async () => {
    if (await removeSvc.attemptRequest()) dispatch(removeDataSuccess(data._id))
  }

  const onClickDetails = () => {
    history.push(detailsUrl)
  }

  return (
    <CardRoot>
      <div className="relative flex flex-row items-center w-full h-14 px-4 py-2">
        {/* Deleting status overlay */}
        {removeSvc.loading && (
          <Overlay className="rounded-md font-normal">
            <TrashIcon width={25} className="animate-bounce" />
            <span className="ml-2">Deleting...</span>
          </Overlay>
        )}

        {/* Coin and link */}
        <div className="flex flex-col leading-none w-3/12">
          <div
            className={classNames(
              "flex items-center space-x-4 w-3/12",
              hasCoinLink && "cursor-pointer"
            )}
            onClick={hasCoinLink ? onClickDetails : undefined}
          >
            <img src={data.coin?.image} width="30" height="30" />
            <div className="flex flex-col leading-none">
              <Item title={data.coin.symbol} value={data.coin.name} />
            </div>
          </div>
        </div>

        {/* Opened on */}
        <div className="flex flex-col leading-none w-2/12">
          <Item title="Opened on" value={dateFormat(data.opened_at)} />
        </div>

        {/* Value and balance */}
        <div className="flex justify-between items-center w-4/12">
          <div className="flex flex-col leading-none">
            <Item
              // ! TODO: Change to sellPrice depending on type
              title={t("transactions.buyPrice")}
              value={
                <span className="font-medium">
                  {currencyFormat(data.coin.price)}
                </span>
              }
            />
          </div>
          <div className="flex flex-col leading-none text-right">
            <SignFigure
              className="font-medium"
              data={data.percentageDiff}
              filter={percentFormat}
            />
            <SignFigure
              className="text-xs font-normal"
              data={data.balanceDiff}
              filter={currencyFormat}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end items-center gap-2 w-3/12">
          {hasStatus && data.status && (
            <Tag
              backgroundColor={settings.STATUS_COLORS[data.status]}
              className="mr-2"
            >
              {data.status}
            </Tag>
          )}
          {hasDetailsButton && (
            <Link to={detailsUrl}>
              <button className="rounded-full hover:bg-gray-800 p-2.5">
                <EyeIcon width={22} />
              </button>
            </Link>
          )}
          <Dropdown
            items={[
              {
                icon: <PencilIcon width={18} />,
                title: "Edit"
                // action: () => setShowPositionModal(true)
              },
              {
                icon: <TrashIcon width={18} />,
                className: "bg-red-900",
                title: "Remove",
                action: removeElement
              }
            ]}
          />
        </div>
      </div>
    </CardRoot>
  )
}

export default TransactionRow
