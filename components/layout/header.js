import Link from "next/link"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { UpperMenu } from "../nav"
import { BroccoliIcon, LogInIcon, LogOutIcon } from "../icons"
import { AuthModal } from "../modals/auth"
import { useLogOut } from "../../services/auth"
import settings from "../../settings.json"
import styles from "../../styles/header.module.css"

const Header = () => {
  const [t] = useTranslation()
  const { isLoggedIn } = useSelector(state => state.auth)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { performRequest } = useLogOut()

  return (
    <header className={styles.nav}>
      {/* App logo & name */}
      <Link
        href={isLoggedIn ? settings.ROUTES.USER_DEFAULT : settings.ROUTES.ROOT}
      >
        <a>
          <div className="flex divide-x divide-gray-400 space-x-4">
            <BroccoliIcon
              height={30}
              width={30}
              className="fill-current text-gray-200 transition transform ease-in-out hover:-rotate-45"
            />
            <span className="text-xl font-bold tracking-tighter hide-sm px-4">
              {t("app.name")}
            </span>
          </div>
        </a>
      </Link>

      {/* Right side links */}
      <div className={styles.rightSide}>
        {/* Navigation menu */}
        <nav className="flex items-center">
          {isLoggedIn && <UpperMenu />}

          {/* Log in / Log out link */}
          <button
            className="flex items-center gap-2 text-sm rounded-md hover:bg-gray-700 py-1 px-3"
            onClick={
              isLoggedIn
                ? () => performRequest()
                : () => setShowLoginModal(true)
            }
          >
            {isLoggedIn ? (
              <LogOutIcon
                className="on-hover-enlarge fill-current font-bold"
                width={25}
                height={25}
              />
            ) : (
              <LogInIcon
                className="on-hover-enlarge fill-current font-bold"
                width={25}
                height={25}
              />
            )}
            <span>{t(isLoggedIn ? "logout.title" : "login.title")}</span>
          </button>
        </nav>
      </div>

      <AuthModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </header>
  )
}

export default Header
