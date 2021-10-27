import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { FormInput, Submit } from "../components/forms"
import { LogInIcon } from "../components/icons"
import { useSignUp } from "../services"
import { FormError } from "../components/forms/shared"

const SignupForm = ({ onClose }) => {
  const [t] = useTranslation()
  const signupSvc = useSignUp()
  const { error } = useSelector(state => state.auth)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid, errors }
  } = useForm({
    mode: "all"
  })

  /**
   * Send request to API
   * If error, empty password fields
   */
  const submit = async data => {
    const response = await signupSvc.attemptSignup(data)
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
      <FormError>{errors.email?.message}</FormError>

      <FormInput
        id="username"
        type="text"
        label={t("profile.username")}
        isError={errors?.username}
        register={register}
        autoComplete="off"
        options={{
          required: {
            value: true,
            message: t("signup.message.usernameRequired")
          }
        }}
      />
      <FormError>{errors.username?.message}</FormError>

      <FormInput
        id="password"
        type="password"
        label={t("profile.password")}
        isError={errors?.password}
        register={register}
        autoComplete="off"
        options={{
          required: {
            value: true,
            message: t("signup.message.passwordRequired")
          }
        }}
      />
      <FormError>{errors.password?.message}</FormError>

      <FormInput
        id="repeatPassword"
        type="password"
        label={t("profile.repeatPassword")}
        isError={errors?.repeatPassword}
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
      <FormError>{errors.repeatPassword?.message}</FormError>

      {error && (
        <p className="text-red-700 text-sm font-normal mb-2">{error}</p>
      )}
      <Submit type="submit" disabled={!isValid} loading={signupSvc.loading}>
        <LogInIcon width={25} />
        <span className="mx-2">{t("signup.submit")}</span>
      </Submit>
    </form>
  )
}

export default SignupForm
