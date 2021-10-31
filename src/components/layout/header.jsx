import { useState } from "react"
import { useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { BroccoliIcon, LogInIcon, LogOutIcon, PersonCircleIcon } from "../icons"
import { AuthModal } from "../modals/auth"
import Tooltip from "../tooltip"
import { useLogOut } from "../../services/auth"
import settings from "../../settings.json"

export default function Header() {
  const [t] = useTranslation()
  const { isLoggedIn, user } = useSelector(state => state.auth)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const history = useHistory()
  const doLogout = useLogOut()

  const NavLink = ({ action, title, icon }) => {
    const Icon = icon || null
    return (
      <Tooltip title={title} className="pl-4">
        <button onClick={action}>
          <Icon
            className="on-hover-enlarge text-white fill-current"
            width={32}
            height={32}
          />
        </button>
      </Tooltip>
    )
  }

  return (
    <header className="flex items-center justify-between w-full h-20 max-h-20 px-8 z-20">
      {/* App logo & name */}
      <Link
        to={isLoggedIn ? settings.ROUTES.USER_DEFAULT : settings.ROUTES.ROOT}
      >
        <div className="flex divide-x divide-gray-400 space-x-4">
          <BroccoliIcon
            height={30}
            width={30}
            className="fill-current text-gray-200 transition transform ease-in-out hover:-rotate-45"
          />
          <span className="text-xl font-bold tracking-tighter hide-mobile px-4">
            {t("app.name")}
          </span>
        </div>
      </Link>

      {/* Right side links */}
      <div className="flex items-center divide-x divide-gray-400 space-x-4">
        {/* Welcome user */}
        <div className="flex flex-col items-end leading-none">
          <span className="text-sm show-only-mobile">{t("app.welcome")}</span>
          <span className="text-sm hide-mobile">
            {t("app.welcomeTo")} {t("app.name")}
          </span>
          <small className="text-gray-300 font-medium">
            {isLoggedIn ? <strong>{user.email}</strong> : t("login.authText")}
          </small>
        </div>

        {/* Navigation menu */}
        <nav className="flex">
          {isLoggedIn && (
            <Tooltip title={t("profile.tooltip")} className="pl-4">
              <button onClick={() => history.push(settings.ROUTES.USER)}>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    className="rounded-full"
                    width={32}
                    height={32}
                  />
                ) : (
                  <PersonCircleIcon
                    className="on-hover-enlarge text-white fill-current"
                    width={32}
                    height={32}
                  />
                )}
              </button>
            </Tooltip>
          )}
          <NavLink
            action={
              isLoggedIn ? () => doLogout() : () => setShowLoginModal(true)
            }
            icon={isLoggedIn ? LogOutIcon : LogInIcon}
            title={t(isLoggedIn ? "logout.title" : "login.title")}
          />
        </nav>
      </div>

      <AuthModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </header>
  )
}