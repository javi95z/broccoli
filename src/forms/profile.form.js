import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { FormInput, FormError, Submit } from "../components/forms"
import { useLoggedUser } from "../services/auth"

const ProfileForm = () => {
  const [t] = useTranslation()
  const userSvc = useLoggedUser()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isDirty, errors }
  } = useForm({ mode: "all" })

  const fetchUser = async () => {
    const response = await userSvc.attemptRequest()
    !response.error && reset(response)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  /**
   * Send request to API
   */
  const submit = async data => {
    console.log(data)
    // const response = await signupSvc.attemptSignup(data)
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(submit)}>
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

      <Submit disabled={!isValid || !isDirty}>{t("common.save")}</Submit>
    </form>
  )
}

export default ProfileForm
