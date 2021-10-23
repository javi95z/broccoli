import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { FormInput, Submit } from "../components/forms"
import { LogInIcon } from "../components/icons"
import { useLogIn } from "../services/auth"
import { FormError } from "../components/forms/shared"

const LoginForm = ({ onClose }) => {
  const [t] = useTranslation()
  const doLogin = useLogIn()
  const { loading, error } = useSelector(state => state.auth)
  const {
    register,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm({
    mode: "all"
  })

  const submit = async data => {
    const response = await doLogin(data)
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

      {error && (
        <p className="text-red-700 text-sm font-medium mb-2">{error}</p>
      )}
      <Submit type="submit" disabled={!isValid}>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <>
            <LogInIcon width={25} />
            <span className="mx-2">{t("login.submit")}</span>
          </>
        )}
      </Submit>
    </form>
  )
}

export default LoginForm
