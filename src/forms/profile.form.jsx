import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { FormInput, FormError, Submit } from "../components/forms"
import { useGetLoggedUser } from "../services"
import { useUpdateUser } from "../services/auth"
import { useSelector } from "react-redux"
import { isEmpty } from "../utils"
import { PersonCircleIcon } from "../components/icons"
import styles from "../components/forms/forms.module.css"

const ProfileForm = () => {
  const [t] = useTranslation()
  const userSvc = useGetLoggedUser()
  const updateSvc = useUpdateUser()
  const { user } = useSelector(state => state.auth)
  const {
    register,
    handleSubmit,
    reset,
    getValues,
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
      <div className={styles.formFileWrapper}>
        <PersonCircleIcon className="text-white fill-current" width={100} />
        <input type="file" className={styles.formFile} />
      </div>

      <FormInput
        id="email"
        type="email"
        label={t("profile.email")}
        isError={errors?.email}
        errorMessage={errors.email?.message}
        register={register}
      />

      <FormInput
        id="fullname"
        type="text"
        label={t("profile.fullname")}
        isError={errors?.fullname}
        errorMessage={errors.fullname?.message}
        register={register}
      />

      <Submit disabled={!isValid || !isDirty}>{t("common.save")}</Submit>
    </form>
  )
}

export default ProfileForm
