import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { FormInput, FormSelect, FormError, Submit } from "../components/forms"
import { toast } from "../services"

const SettingsForm = () => {
  const [t] = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty, errors }
  } = useForm({ mode: "all" })

  const languages = [
    { id: "en", value: "English" },
    { id: "es", value: "Spanish" },
    { id: "fr", value: "French" }
  ]

  /**
   * Send request to API
   */
  const submit = async data => {
    console.log(data)
    toast.error(t("app.message.notAvailable"))
  }

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit(submit)}>
      <FormSelect
        id="language"
        type="text"
        label={t("settings.language")}
        items={languages}
        isError={errors?.language}
        register={register}
      />
      <FormError>{errors.language?.message}</FormError>

      <Submit disabled={!isValid || !isDirty}>{t("common.save")}</Submit>
    </form>
  )
}

export default SettingsForm
