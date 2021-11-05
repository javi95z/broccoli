import { useState } from "react"
import { LoginModal, SignupModal } from "./"

/**
 * @param {Object} params
 * @param {Boolean} params.show
 * @param {Function} params.onClose
 * @returns {JSX.Element}
 */
const AuthModal = ({ show, onClose }) => {
  if (!show) return null
  const [authType, setAuthType] = useState("login")

  return authType === "login" ? (
    <LoginModal show={true} onClose={onClose} onChangeType={setAuthType} />
  ) : authType === "signup" ? (
    <SignupModal show={true} onClose={onClose} onChangeType={setAuthType} />
  ) : null
}

export default AuthModal
