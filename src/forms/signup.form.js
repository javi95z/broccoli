import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { FormInput, Submit } from "../components/forms"
import { LogInIcon } from "../components/icons"
import { useSignUp } from "../services/auth"
import { FormError } from "../components/forms/shared"

const SignupForm = ({ onClose }) => {
  const [t] = useTranslation()
  const doSignup = useSignUp()
  const { loading, error } = useSelector(state => state.auth)
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors }
  } = useForm({
    mode: "all"
  })

  /**
   * Send request to API
   * if there is no error, take user to log in modal
   */
  const submit = async data => {
    try {
      const response = await doSignup(data)
      // ! TODO: Fix
      onClose()
    } catch (error) {
      // Do nothing
    }
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(submit)}>
      <FormInput
        id="email"
        type="email"
        label="Email address"
        isError={errors?.email}
        register={register}
        options={{
          required: {
            value: true,
            message: t("signup.errors.emailRequired")
          },
          pattern: {
            value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
            message: t("signup.errors.emailInvalid")
          }
        }}
      />
      <FormError>{errors.email?.message}</FormError>

      <FormInput
        id="username"
        type="text"
        label="Username"
        isError={errors?.username}
        register={register}
        autoComplete="off"
        options={{
          required: {
            value: true,
            message: t("signup.errors.usernameRequired")
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
        autoComplete="off"
        options={{
          required: {
            value: true,
            message: t("signup.errors.passwordRequired")
          }
        }}
      />
      <FormError>{errors.password?.message}</FormError>

      <FormInput
        id="repeatPassword"
        type="password"
        label="Repeat password"
        isError={errors?.repeatPassword}
        register={register}
        autoComplete="off"
        options={{
          required: {
            value: true,
            message: t("signup.errors.repeatRequired")
          },
          validate: v => {
            if (v !== watch("password")) {
              return t("signup.errors.passwordUnmatch")
            }
          }
        }}
      />
      <FormError>{errors.repeatPassword?.message}</FormError>

      {error && (
        <p className="text-red-700 text-sm font-normal mb-2">{error}</p>
      )}
      <Submit type="submit" disabled={!isValid}>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <>
            <LogInIcon width={25} />
            <span className="mx-2">{t("signup.submit")}</span>
          </>
        )}
      </Submit>
    </form>
  )
}

export default SignupForm
