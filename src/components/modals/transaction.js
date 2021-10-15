import { useState } from "react"
// import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
// import { useGetRequest, usePostRequest } from "../../hooks"
import {
  FormInput,
  // FormSelect,
  Submit
} from "../forms"
import { RootModal } from "."
// import { addPositionAction } from "../../app/positions"
import { DollarIcon } from "../icons"
import classNames from "classnames"
import settings from "../../settings.json"

const TransactionModal = ({ show, onClose }) => {
  if (!show) return null
  const [t] = useTranslation()
  const [type, setType] = useState("buy")
  // const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: {
      errors
      // isValid
    }
  } = useForm({ mode: "all" })
  // const positionsSvc = usePostRequest(settings.ROUTES.POSITIONS)
  // const coinsSvc = useGetRequest(settings.ROUTES.COINS)
  // const [coinSelectItems, setCoinSelectItems] = useState()

  const submit = async data => {
    const body = {
      type,
      ...data
    }
    console.warn(body)
    //   const response = await positionsSvc.attemptRequest(data)
    //   if (response.error) {
    //     // TODO: Show error toast
    //   } else {
    //     dispatch(addPositionAction(response))
    //     handler(false)
    //   }
  }

  /**
   * Fetch coins information and
   * load it into form select
   */
  // useEffect(() => {
  //   const fetchCoinsData = async () => {
  //     await coinsSvc.attemptRequest({ page: 1, size: 10 })
  //   }
  //   coinsSvc.data
  //     ? setCoinSelectItems(mapCoinsData(coinsSvc.data))
  //     : fetchCoinsData()
  // }, [coinsSvc.data])

  // const mapCoinsData = data =>
  //   data.map(c => {
  //     return { id: c._id, value: c.name, image: c.image }
  //   })

  const BuySellButton = ({ id, color, children }) => (
    <button
      className={classNames("w-1/2 rounded m-1", type === id && color)}
      onClick={() => setType(id)}
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

        <form className="flex flex-col" onSubmit={handleSubmit(submit)}>
          {/* <FormSelect
            id="coin"
            label="Cryptocurrency"
            register={register}
            errors={errors}
            selectItems={coinSelectItems}
            isLoading={coinsSvc.isLoading}
            options={{
              required: {
                value: true,
                message: "Cryptocurrency field is required"
              }
            }}
          /> */}
          <FormInput
            id="value"
            key="value_p"
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
                message: t("transactions.errors.buyPriceRequired")
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
                message: t("transactions.errors.buyAmountRequired")
              }
            }}
          />
          {/* TODO Date */}
          <Submit
          // disabled={!isValid}
          // loading={positionsSvc.isLoading}
          >
            {t("common.add")}
          </Submit>
        </form>
      </div>
    </RootModal>
  )
}

export default TransactionModal
