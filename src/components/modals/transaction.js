import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import classNames from "classnames"
import { FormInput, FormSelect, Submit } from "../forms"
import { RootModal } from "./"
import { DollarIcon } from "../icons"
import { toast, useAddTransaction, useGetCoins } from "../../services"

const TransactionModal = ({ show, onClose }) => {
  if (!show) return null
  const [t] = useTranslation()
  const [type, setType] = useState("buy")
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      price: "",
      amount: "",
      coin: ""
    }
  })
  const transactionSvc = useAddTransaction()
  const coinsSvc = useGetCoins()
  const [coinSelectItems, setCoinSelectItems] = useState([])

  const submit = async data => {
    const body = { type, ...data }
    const response = await transactionSvc.attemptRequest(body)
    response && onClose()
  }

  /**
   * Switch type of transaction and
   * reset form and errors
   */
  const switchType = type => {
    setType(type)
    reset()
  }

  /**
   * Fetch coins information and
   * load it into form select
   */
  const fetchCoinsData = async () => {
    const response = await coinsSvc.attemptRequest({ page: 1, size: 10 })
    response.error
      ? toast("Error when loading coins data", "error")
      : setCoinSelectItems(mapCoinsData(response.data))
  }

  useEffect(() => {
    fetchCoinsData()
  }, [])

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
    <RootModal onClose={onClose}>
      <div className="w-60">
        <h2 className="text-2xl tracking-tight font-thin mb-5">
          {t("transactions.add")}
        </h2>

        <div className="flex justify-between shadow rounded w-full font-normal text-sm bg-gray-800 text-gray-200 h-10 mb-4">
          <BuySellButton id="buy" color="bg-green-800">
            {t("common.buy")}
          </BuySellButton>
          <BuySellButton id="sell" color="bg-red-800">
            {t("common.sell")}
          </BuySellButton>
        </div>

        <form
          className="flex flex-col"
          autoComplete="off"
          onSubmit={handleSubmit(submit)}
        >
          <FormSelect
            id="coin"
            key="coin_p"
            label={t(`transactions.coin`)}
            register={register}
            errors={errors}
            items={coinSelectItems}
            isLoading={coinsSvc.loading}
            options={{
              required: {
                value: true,
                message: "Cryptocurrency field is required"
              }
            }}
          />
          <FormInput
            id="price"
            key="price_p"
            type="number"
            label={t(`transactions.${type}Price`)}
            register={register}
            errors={errors}
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
          <FormInput
            id="amount"
            key="amount_p"
            type="number"
            label={t(`transactions.${type}Amount`)}
            register={register}
            errors={errors}
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
          {/* TODO Date */}
          <Submit
            // disabled={!isValid}
            loading={transactionSvc.loading}
          >
            {t("common.add")}
          </Submit>
        </form>
      </div>
      {/* <DevTool control={control} /> set up the dev tool */}
    </RootModal>
  )
}

export default TransactionModal
