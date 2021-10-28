import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { FormInput, FormError, Submit } from "../components/forms"
import { useGetLoggedUser } from "../services"
import { useUpdateUser } from "../services/auth"
import { useSelector } from "react-redux"
import { isEmpty } from "../utils"

const ProfileForm = () => {
  const [t] = useTranslation()
  const userSvc = useGetLoggedUser()
  const updateSvc = useUpdateUser()
  const { user } = useSelector(state => state.auth)
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isDirty, errors }
  } = useForm({ mode: "all" })

  const fetchUser = async () => {
    await userSvc.attemptRequest()
  }

  useEffect(() => {
    !isEmpty(user) ? reset(user) : fetchUser()
  }, [user])

  /**
   * Send request to API
   */
  const submit = async data => {
    const response = await updateSvc.attemptRequest(data)
    response && reset(response)
  }

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit(submit)}>
      <FormInput
        id="username"
        type="text"
        label={t("profile.username")}
        isError={errors?.username}
        register={register}
      />
      <FormError>{errors.username?.message}</FormError>

      <FormInput
        id="email"
        type="email"
        label={t("profile.email")}
        isError={errors?.email}
        register={register}
      />
      <FormError>{errors.email?.message}</FormError>

      <FormInput
        id="fullname"
        type="text"
        label={t("profile.fullname")}
        isError={errors?.fullname}
        register={register}
      />
      <FormError>{errors.fullname?.message}</FormError>

      <Submit disabled={!isValid || !isDirty}>{t("common.save")}</Submit>
    </form>
  )
}

export default ProfileForm
