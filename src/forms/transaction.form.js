import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import classNames from "classnames"
import { FormInput, FormSelect, FormError, Submit } from "../components/forms"
import { DollarIcon } from "../components/icons"
import {
  toast,
  useAddTransaction,
  useGetCoins,
  useGetHoldings
} from "../services"

const TransactionForm = ({ onClose }) => {
  const [t] = useTranslation()
  const [type, setType] = useState("buy")
  const [coinSelectItems, setCoinSelectItems] = useState([])
  const transactionSvc = useAddTransaction()
  const holdingsSvc = useGetHoldings(true)
  const coinsSvc = useGetCoins()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({ mode: "all" })

  const submit = async data => {
    const body = { type, ...data }
    const response = await transactionSvc.attemptRequest(body)
    holdingsSvc.fetch()
    response && onClose()
  }

  /**
   * Fetch coins information and
   * load it into form select
   */
  const fetchCoinsData = async () => {
    console.log("ee")
    if (coinSelectItems.length) return
    try {
      const response = await coinsSvc.attemptRequest({ page: 1, size: 10 })
      response.error
        ? toast.error(t("transactions.errors.noCoinsLoaded"))
        : setCoinSelectItems(mapCoinsData(response.data))
    } catch (error) {
      // Do nothing
    }
  }

  /**
   * Switch type of transaction and
   * reset form and errors
   */
  const switchType = type => {
    setType(type)
    reset()
  }

  const mapCoinsData = data =>
    data.map(c => {
      return { id: c._id, value: c.name, image: c.image }
    })

  const BuySellButton = ({ id, color, children }) => (
    <button
      className={classNames("w-1/2 rounded m-1", type === id && color)}
      onClick={() => switchType(id)}
    >
      {children}
    </button>
  )

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit(submit)}
      autoComplete="off"
    >
      <div className="flex justify-between shadow rounded w-full font-normal text-sm bg-gray-800 text-gray-200 h-10 mb-4">
        <BuySellButton id="buy" color="bg-green-800">
          {t("common.buy")}
        </BuySellButton>
        <BuySellButton id="sell" color="bg-red-800">
          {t("common.sell")}
        </BuySellButton>
      </div>

      <FormSelect
        id="coin"
        label={t("transactions.coin")}
        register={register}
        onClick={fetchCoinsData}
        items={coinSelectItems}
        isError={errors?.coin}
        isLoading={coinsSvc.loading}
        options={{
          required: {
            value: true,
            message: t("transactions.errors.coinRequired")
          }
        }}
      />
      <FormError>{errors.coin?.message}</FormError>

      <FormInput
        id="price"
        type="number"
        label={t(`transactions.${type}Price`)}
        register={register}
        isError={errors?.price}
        icon={<DollarIcon width={20} className="text-white fill-current" />}
        placeholder="3000.50"
        min="0"
        step="0.0001"
        options={{
          required: {
            value: true,
            message: t(`transactions.errors.${type}PriceRequired`)
          }
        }}
      />
      <FormError>{errors.price?.message}</FormError>

      <FormInput
        id="amount"
        type="number"
        label={t(`transactions.${type}Amount`)}
        register={register}
        isError={errors?.amount}
        placeholder="6.54"
        min="0"
        step="0.0001"
        options={{
          required: {
            value: true,
            message: t(`transactions.errors.${type}AmountRequired`)
          }
        }}
      />
      <FormError>{errors.amount?.message}</FormError>

      {/* TODO Date */}
      <Submit disabled={!isValid} loading={transactionSvc.loading}>
        {t("common.add")}
      </Submit>
    </form>
  )
}

export default TransactionForm
