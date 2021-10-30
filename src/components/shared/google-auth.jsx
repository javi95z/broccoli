import { useTranslation } from "react-i18next"
import { GoogleLogin } from "react-google-login"
import { GoogleIcon } from "../icons"
import { ButtonIcon } from "./"
import { toast, useGoogleLogIn } from "../../services"

const GoogleAuth = ({ onClose }) => {
  const [t] = useTranslation()
  const googleSvc = useGoogleLogIn()
  const clientId = import.meta.env.VITE_GOOGLE_AUTH

  const onSuccess = async res => {
    const { email, name, imageUrl } = res.profileObj
    const data = {
      email,
      fullname: name,
      avatar: imageUrl
    }
    const response = await googleSvc.attemptLogin(data)
    response && onClose()
  }

  const onFailure = () => {
    toast.error(t("login.message.googleAuthFailed"))
  }

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      render={props => (
        <ButtonIcon
          onClick={props.onClick}
          disabled={props.disabled}
          className="w-full text-sm"
          color="secondary"
          icon={<GoogleIcon />}
        >
          {t("login.googleAuth")}
        </ButtonIcon>
      )}
    />
  )
}

export default GoogleAuth
