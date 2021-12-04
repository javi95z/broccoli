import { useTranslation } from "react-i18next"
import { RootModal } from "../"
import { LoginForm } from "../../../forms"

/**
 * @param {Object} params
 * @param {Boolean} params.show
 * @param {Function} params.onClose
 * @param {Function} params.onChangeType
 * @returns {JSX.Element}
 */
const LoginModal = ({ show, onClose, onChangeType }) => {
  if (!show) return null
  const [t] = useTranslation()

  return (
    <RootModal onClose={onClose}>
      <div className="flex flex-col justify-center items-center">
        <RootModal.Title className="text-3xl">
          {t("login.title")}
        </RootModal.Title>
        <RootModal.Description>{t("login.description")}</RootModal.Description>
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
    </RootModal>
  )
}

export default LoginModal
