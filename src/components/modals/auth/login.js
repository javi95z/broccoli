import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import RootModal from "../root"
import { Submit, FormInput } from "../../forms"
import { LogInIcon } from "../../icons"
import { useLogIn } from "../../../services/auth"
import settings from "../../../settings.json"

const LoginModal = () => {
  const { loading, error } = useSelector(state => state.auth)
  const doLogin = useLogIn()
  const {
    register,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm({ mode: "onChange" })

  const submit = async data => {
    await doLogin(data)
  }

  return (
    <RootModal>
      <div className="flex flex-col w-64">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-3xl tracking-tight font-bold mb-1">Log In</h2>
          <span className="w-3/4 leading-tight text-sm text-gray-300">
            Login using one of the following options
          </span>
        </div>
        <div className="space-y-3 mt-8 w-full">
          <form className="flex flex-col" onSubmit={handleSubmit(submit)}>
            <FormInput
              id="username"
              type="text"
              label="Username"
              errors={errors}
              register={register}
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
              options={{
                required: {
                  value: true,
                  message: "Password field is required"
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
                  <span className="mx-2">Log In</span>
                </>
              )}
            </Submit>
          </form>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm leading-tight w-4/5 mt-5">
              I dont have an account. <br />
              <Link
                to={settings.ROUTES.SIGN_UP}
                className="text-green-500 font-medium cursor-pointer"
              >
                Sign me up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </RootModal>
  )
}

export default LoginModal
