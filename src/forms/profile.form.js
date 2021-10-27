import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { FormInput, FormError, Submit } from "../components/forms"
import { useLoggedUser } from "../services"
import { castToUser } from "../services/cast"
import { useUpdateUser } from "../services/auth"

const ProfileForm = () => {
  const [t] = useTranslation()
  const userSvc = useLoggedUser()
  const updateSvc = useUpdateUser()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isDirty, errors }
  } = useForm({ mode: "all" })

  const fetchUser = async () => {
    const response = await userSvc.attemptRequest()
    const userModel = castToUser(response)
    !response.error && reset(userModel)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  /**
   * Send request to API
   */
  const submit = async data => {
    const response = await updateSvc.attemptRequest(data)
    console.log(response)
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
