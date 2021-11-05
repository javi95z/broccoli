import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import classNames from "classnames"
import { DollarIcon } from "../components/icons"
import { FormInput, FormSubtitle, Submit } from "../components/forms"
import { CoinSelect } from "../components/coins"
import { useAddTransaction, useUpdateTransaction } from "../services"
import { cryptoFormat } from "../utils"

const TransactionForm = ({ data, isEdit, onClose }) => {
  const [t] = useTranslation()
  /** @type {SelectorHoldings} */
  const holdings = useSelector(state => state.holdings)
  const [type, setType] = useState("buy")
  const [amountOwned, setAmountOwned] = useState(null)
  const addTransactionSvc = useAddTransaction()
  const editTransactionSvc = useUpdateTransaction(data?._id)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid, isDirty }
  } = useForm({ mode: "all" })
  const selectedCoin = watch("coin")

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
      ? setAmountOwned(cryptoFormat(holding.amount, holding.coin.symbol))
      : setAmountOwned(null)
  }, [selectedCoin])

  const submit = async data => {
    const body = { type, ...data }
    const response = isEdit
      ? await editTransactionSvc.attemptRequest(data)
      : await addTransactionSvc.attemptRequest(body)
    response && onClose()
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
        setValue={setValue}
        register={register}
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

      {/* TODO Date */}
      <Submit
        disabled={!isValid || !isDirty}
        loading={addTransactionSvc.loading}
      >
        {t(`common.${isEdit ? "edit" : "add"}`)}
      </Submit>
    </form>
  )
}

export default TransactionForm
