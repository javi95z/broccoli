import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { FormInput, Submit } from "../components/forms"
import { LogInIcon } from "../components/icons"
import { useSignUp } from "../services"

const SignupForm = ({ onClose }) => {
  const [t] = useTranslation()
  const signupSvc = useSignUp()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid, errors }
  } = useForm({ mode: "all" })

  /**
   * Send request to API
   * If error, empty password fields
   */
  const submit = async data => {
    const response = await signupSvc.performRequest(data)
    if (response) {
      onClose()
    } else {
      setValue("password", "")
      setValue("repeatPassword", "")
    }
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(submit)}>
      <FormInput
        id="email"
        type="email"
        label={t("profile.email")}
        isError={errors?.email}
        errorMessage={errors.email?.message}
        register={register}
        options={{
          required: {
            value: true,
            message: t("signup.message.emailRequired")
          },
          pattern: {
            value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
            message: t("signup.message.emailInvalid")
          }
        }}
      />

      <FormInput
        id="password"
        type="password"
        label={t("profile.password")}
        isError={errors?.password}
        errorMessage={errors.password?.message}
        register={register}
        autoComplete="off"
        options={{
          required: {
            value: true,
            message: t("signup.message.passwordRequired")
          }
        }}
      />

      <FormInput
        id="repeatPassword"
        type="password"
        label={t("profile.repeatPassword")}
        isError={errors?.repeatPassword}
        errorMessage={errors.repeatPassword?.message}
        register={register}
        autoComplete="off"
        options={{
          required: {
            value: true,
            message: t("signup.message.repeatRequired")
          },
          validate: v => {
            if (v !== watch("password")) {
              return t("signup.message.passwordUnmatch")
            }
          }
        }}
      />

      <Submit type="submit" disabled={!isValid} loading={signupSvc.loading}>
        <LogInIcon width={25} />
        <span className="mx-2">{t("signup.submit")}</span>
      </Submit>
    </form>
  )
}

export default SignupForm
