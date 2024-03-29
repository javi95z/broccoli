import { useTranslation } from "react-i18next"
import { RootModal } from "../"
import { SignupForm } from "../../../forms"

/**
 * @param {Object} params
 * @param {Boolean} params.show
 * @param {Function} params.onClose
 * @param {Function} params.onChangeType
 * @returns {JSX.Element}
 */
const SignupModal = ({ show, onClose, onChangeType }) => {
  if (!show) return null
  const [t] = useTranslation()

  return (
    <RootModal onClose={onClose}>
      <div className="flex flex-col justify-center items-center">
        <RootModal.Title className="text-3xl">
          {t("signup.title")}
        </RootModal.Title>
        <RootModal.Description>{t("signup.description")}</RootModal.Description>
      </div>
      <div className="space-y-3 mt-8 w-full">
        <SignupForm onClose={onClose} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm leading-tight w-4/5 mt-5">
          {t("signup.haveAccount")} <br />
          <button
            className="text-green-500 font-medium cursor-pointer"
            onClick={() => onChangeType("login")}
          >
            {t("signup.logInLink")}
          </button>
        </p>
      </div>
    </RootModal>
  )
}

export default SignupModal
