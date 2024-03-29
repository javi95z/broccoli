import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { LogInIcon } from "../components/icons"
import { FormInput, Submit } from "../components/forms"
import { GoogleAuth } from "../components/shared"
import { useLogIn } from "../services"

const LoginForm = ({ onClose }) => {
  const [t] = useTranslation()
  const loginSvc = useLogIn()
  const {
    register,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm({ mode: "all" })

  const submit = async data => {
    const response = await loginSvc.performRequest(data)
    response && onClose()
  }

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit(submit)}
      autoComplete="off"
    >
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
            message: t("login.message.emailRequired")
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
        options={{
          required: {
            value: true,
            message: t("login.message.passwordRequired")
          }
        }}
      />

      <Submit type="submit" disabled={!isValid} loading={loginSvc.loading}>
        <LogInIcon width={25} />
        <span className="mx-2">{t("login.submit")}</span>
      </Submit>

      <div className="mt-8">
        <GoogleAuth onClose={onClose} />
      </div>
    </form>
  )
}

export default LoginForm
