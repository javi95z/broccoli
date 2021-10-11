// import { useState } from "react"
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
// import settings from "../../settings.json"

const TransactionModal = () => {
  const [t] = useTranslation()
  // const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({ mode: "all" })
  // const positionsSvc = usePostRequest(settings.ROUTES.POSITIONS)
  // const coinsSvc = useGetRequest(settings.ROUTES.COINS)
  // const [coinSelectItems, setCoinSelectItems] = useState()

  const submit = async data => {
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

  return (
    <RootModal>
      <div className="w-60">
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
            label="Buy price"
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
            label="Amount bought"
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
          <Submit
            disabled={!isValid}
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
