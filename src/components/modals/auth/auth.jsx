import { useState } from "react"
import { LoginModal, SignupModal } from "."

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
