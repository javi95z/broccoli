import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import classNames from "classnames"
import {
  FormInput,
  FormSelect,
  FormSubtitle,
  Submit
} from "../components/forms"
import { DollarIcon } from "../components/icons"
import { toast, useAddTransaction, useGetCoins } from "../services"

const TransactionForm = ({ data, isEdit, onClose }) => {
  const [t] = useTranslation()
  const holdings = useSelector(state => state.holdings)
  const [type, setType] = useState("buy")
  const [coinSelectItems, setCoinSelectItems] = useState([])
  const [amountOwned, setAmountOwned] = useState(null)
  const transactionSvc = useAddTransaction()
  const coinsSvc = useGetCoins()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid, isDirty }
  } = useForm({ mode: "all" })
  const selectedCoin = watch("coin")

  useEffect(() => {
    fetchCoinsData()
  }, [])

  /**
   * Populate fields when it's edit mode
   */
  useEffect(() => {
    if (isEdit) {
      const { price, amount, coin } = { ...data, coin: data.coin._id }
      reset({ price, amount, coin })
    }
  }, [data])

  /**
   * Get holding of selected coin
   * Set state to current amount owned
   */
  useEffect(() => {
    const holding = holdings.data.find(x => x.coin._id === selectedCoin) || null
    holding
      ? setAmountOwned(`${holding.amount} ${holding.coin.symbol}`)
      : setAmountOwned(null)
  }, [selectedCoin])

  const submit = async data => {
    const body = { type, ...data }
    if (!isEdit) {
      const response = await transactionSvc.attemptRequest(body)
      response && onClose()
    }
  }

  /**
   * Fetch coins information and
   * load it into form select
   */
  const fetchCoinsData = async () => {
    try {
      const response = await coinsSvc.attemptRequest({ page: 1, size: 10 })
      response.error
        ? toast.error(t("transactions.message.noCoinsLoaded"))
        : setCoinSelectItems(mapCoinsData(response.data))
    } catch (error) {
      // Do nothing
    }
  }

  /**
   * Switch type of transaction
   * Reset form and errors
   */
  const switchType = type => {
    setType(type)
    reset()
  }

  const mapCoinsData = data =>
    data.map(c => {
      return { id: c._id, value: c.name, image: c.image }
    })

  const BuySellButton = ({ id, color, disabled, children }) => (
    <button
      className={classNames(
        "w-1/2 rounded m-1",
        type === id && color,
        disabled && "pointer-events-none"
      )}
      onClick={() => switchType(id)}
      disabled={disabled}
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
        <BuySellButton id="buy" color="bg-green-800" disabled={isEdit}>
          {t("common.buy")}
        </BuySellButton>
        <BuySellButton id="sell" color="bg-red-800" disabled={isEdit}>
          {t("common.sell")}
        </BuySellButton>
      </div>

      <FormSelect
        id="coin"
        label={t("transactions.coin")}
        register={register}
        items={coinSelectItems}
        selectedValue={selectedCoin}
        setValue={setValue}
        isLoading={coinsSvc.loading}
        isError={errors?.coin}
        errorMessage={errors.coin?.message}
        isDisabled={isEdit}
        options={{
          required: {
            value: true,
            message: t("transactions.message.coinRequired")
          }
        }}
      />
      {amountOwned && (
        <FormSubtitle>
          {t("holdings.amountOwned", { amount: amountOwned })}
        </FormSubtitle>
      )}

      <FormInput
        id="price"
        type="number"
        label={t(`transactions.${type}Price`)}
        register={register}
        isError={errors?.price}
        errorMessage={errors.price?.message}
        icon={<DollarIcon width={20} className="text-white fill-current" />}
        placeholder="3000.50"
        min="0"
        step="0.0001"
        options={{
          required: {
            value: true,
            message: t(`transactions.message.${type}PriceRequired`)
          }
        }}
      />

      <FormInput
        id="amount"
        type="number"
        label={t(`transactions.${type}Amount`)}
        register={register}
        isError={errors?.amount}
        errorMessage={errors.amount?.message}
        placeholder="6.54"
        min="0"
        step="0.0001"
        options={{
          required: {
            value: true,
            message: t(`transactions.message.${type}AmountRequired`)
          }
        }}
      />

      {/* TODO Date */}
      <Submit disabled={!isValid || !isDirty} loading={transactionSvc.loading}>
        {t(`common.${isEdit ? "edit" : "add"}`)}
      </Submit>
    </form>
  )
}

export default TransactionForm
