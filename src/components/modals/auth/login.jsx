import { useTranslation } from "react-i18next"
import { RootModal } from "../"
import { LoginForm } from "../../../forms"

const LoginModal = ({ show, onClose, onChangeType }) => {
  if (!show) return null
  const [t] = useTranslation()

  return (
    <RootModal onClose={onClose}>
      <div className="flex flex-col w-64">
        <div className="flex flex-col justify-center items-center">
          <RootModal.Title className="text-3xl">
            {t("login.title")}
          </RootModal.Title>
          <span className="w-3/4 leading-tight text-sm text-gray-300">
            {t("login.description")}
          </span>
        </div>
        <div className="space-y-3 mt-8 w-full">
          <LoginForm onClose={onClose} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm leading-tight w-4/5 mt-5">
            {t("login.noAccount")} <br />
            <button
              onClick={() => onChangeType("signup")}
              className="text-green-500 font-medium cursor-pointer"
            >
              {t("login.signUpLink")}
            </button>
          </p>
        </div>
      </div>
    </RootModal>
  )
}

export default LoginModal
