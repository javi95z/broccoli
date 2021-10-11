import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { RootModal } from "../"
import { Submit, FormInput } from "../../forms"
import { LogInIcon } from "../../icons"
import { useSignUp } from "../../../services/auth"
import settings from "../../../settings.json"

const SignupModal = () => {
  const { loading, error } = useSelector(state => state.auth)
  const doSignup = useSignUp()
  const {
    register,
    handleSubmit,
    // setValue,
    watch,
    formState: { isValid, errors }
  } = useForm({ mode: "all" })

  /**
   * Empty password fields and send request to API
   * if there is no error, take user to log in modal
   */
  const submit = async data => {
    await doSignup(data)
  }

  return (
    <RootModal>
      <div className="flex flex-col w-64">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-3xl tracking-tight font-bold mb-1">Sign up</h2>
          <span className="w-3/4 leading-tight text-sm text-gray-300">
            Sign up entering your credentials
          </span>
        </div>
        <div className="space-y-3 mt-8 w-full">
          <form className="flex flex-col" onSubmit={handleSubmit(submit)}>
            <FormInput
              id="email"
              type="email"
              label="Email address"
              errors={errors}
              register={register}
              autoComplete="off"
              options={{
                required: {
                  value: true,
                  message: "Email address field is required"
                },
                pattern: {
                  value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                  message: "Email address entered is not valid"
                }
              }}
            />
            <FormInput
              id="username"
              type="text"
              label="Username"
              errors={errors}
              register={register}
              autoComplete="off"
              options={{
                required: {
                  value: true,
                  message: "Username field is required"
                }
              }}
            />
            <FormInput
              id="password"
              type="password"
              label="Password"
              errors={errors}
              register={register}
              autoComplete="off"
              options={{
                required: {
                  value: true,
                  message: "Password field is required"
                }
              }}
            />
            <FormInput
              id="repeatPassword"
              type="password"
              label="Repeat password"
              errors={errors}
              register={register}
              autoComplete="off"
              options={{
                required: {
                  value: true,
                  message: "Repeat password field is required"
                },
                validate: v => {
                  if (v !== watch("password")) {
                    return "Passwords do not match"
                  }
                }
              }}
            />
            {error && (
              <p className="text-red-700 text-sm font-normal mb-2">{error}</p>
            )}
            <Submit type="submit" disabled={!isValid}>
              {loading ? (
                <span>Loading...</span>
              ) : (
                <>
                  <LogInIcon width={25} />
                  <span className="mx-2">Create an account</span>
                </>
              )}
            </Submit>
          </form>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm leading-tight w-4/5 mt-5">
              I already have an account. <br />
              <Link
                to={settings.ROUTES.LOG_IN}
                className="text-green-500 font-medium cursor-pointer"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </RootModal>
  )
}

export default SignupModal
