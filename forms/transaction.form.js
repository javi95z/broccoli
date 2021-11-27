import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import classNames from "classnames"
import { DollarIcon } from "../components/icons"
import {
  FormDateInput,
  FormInput,
  FormSubtitle,
  Submit
} from "../components/forms"
import { CoinSelect } from "../components/coins"
import { useAddTransaction } from "../services/transactions"
import { updateTransaction } from "../slices/transactions"
import { cryptoFormat, toPopulateDate } from "../utils"

/**
 * @param {Object} params
 * @param {Transaction} [params.data]
 * @param {Boolean} params.isEdit
 * @param {Function} params.onClose
 * @returns {JSX.Element}
 */
const TransactionForm = ({ data, isEdit, onClose }) => {
  const [t] = useTranslation()
  /** @type {SelectorHoldings} */
  const holdings = useSelector(state => state.holdings)
  /** @type {SelectorTransactions} */
  const { loading } = useSelector(state => state.transactions)
  const dispatch = useDispatch()
  const [type, setType] = useState("buy")
  const [amountOwned, setAmountOwned] = useState(null)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid, isDirty }
  } = useForm({ mode: "all" })
  const selectedCoin = watch("coin")
  const addTransactionSvc = useAddTransaction()

  /**
   * Populate fields when it's edit mode
   */
  useEffect(() => {
    if (isEdit) {
      const { price, amount, coin, date } = {
        ...data,
        coin: data.coin._id,
        date: toPopulateDate(data.date)
      }
      reset({ price, amount, coin, date })
    }
  }, [data])

  /**
   * Get holding of selected coin
   * Set state to current amount owned
   */
  useEffect(() => {
    const holding = holdings.data.find(x => x.coin._id === selectedCoin) || null
    holding
      ? setAmountOwned(cryptoFormat(holding.amount, holding.coin.symbol))
      : setAmountOwned(null)
  }, [selectedCoin])

  const submit = async params => {
    const body = { type, ...params }
    const response = isEdit
      ? dispatch(updateTransaction({ body, id: data._id }))
      : addTransactionSvc.performRequest(body)

    if (response) {
      onClose()
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

      <CoinSelect
        id="coin"
        label={t("transactions.coin")}
        register={register}
        setValue={setValue}
        selectedValue={selectedCoin}
        isDisabled={isEdit}
        options={{
          required: true
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

      <FormDateInput
        id="date"
        label={t("transactions.date")}
        register={register}
        isError={errors?.date}
        errorMessage={errors.date?.message}
        options={{
          required: {
            value: true,
            message: t("transactions.message.dateRequired")
          }
        }}
      />

      <Submit disabled={!isValid || !isDirty} loading={loading}>
        {t(`common.${isEdit ? "edit" : "add"}`)}
      </Submit>
    </form>
  )
}

export default TransactionForm
