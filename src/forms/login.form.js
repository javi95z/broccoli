import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { LogInIcon } from "../components/icons"
import { FormInput, Submit } from "../components/forms"
import { FormError } from "../components/forms/shared"
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
    const response = await loginSvc.attemptLogin(data)
    response && onClose()
  }

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit(submit)}
      autoComplete="off"
    >
      <FormInput
        id="username"
        type="text"
        label="Username"
        isError={errors?.username}
        register={register}
        options={{
          required: {
            value: true,
            message: t("login.errors.usernameRequired")
          }
        }}
      />
      <FormError>{errors.username?.message}</FormError>

      <FormInput
        id="password"
        type="password"
        label="Password"
        isError={errors?.password}
        register={register}
        options={{
          required: {
            value: true,
            message: t("login.errors.passwordRequired")
          }
        }}
      />
      <FormError>{errors.password?.message}</FormError>

      <Submit type="submit" disabled={!isValid} loading={loginSvc.loading}>
        <LogInIcon width={25} />
        <span className="mx-2">{t("login.submit")}</span>
      </Submit>
    </form>
  )
}

export default LoginForm
