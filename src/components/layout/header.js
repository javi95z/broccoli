import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { BroccoliIcon, LogInIcon, LogOutIcon } from "../icons"
import Tooltip from "../tooltip"
import { useLogOut } from "../../services/auth"
import settings from "../../settings.json"

export default function Header() {
  const [t] = useTranslation()
  const { isLoggedIn, user } = useSelector(state => state.auth)
  const doLogout = useLogOut()
  const dispatch = useDispatch()
  const history = useHistory()

  const NavLink = ({ action, title, icon }) => {
    const Icon = icon || null
    return (
      <Tooltip title={title} className="pl-4">
        <button onClick={action}>
          <Icon className="on-hover-enlarge" width={32} height={32} />
        </button>
      </Tooltip>
    )
  }

  return (
    <header className="flex items-center justify-between w-full h-20 max-h-20 px-8 z-20">
      <a
        href={isLoggedIn ? settings.ROUTES.USER_DEFAULT : settings.ROUTES.ROOT}
      >
        <div className="flex divide-x divide-gray-400 space-x-4">
          <BroccoliIcon
            height={30}
            width={30}
            className="fill-current text-gray-200 transition transform ease-in-out hover:-rotate-45"
          />
          <span className="text-xl px-4">{t("app.name")}</span>
        </div>
      </a>
      <div className="flex items-center divide-x divide-gray-400 space-x-4">
        <div className="flex flex-col text-right leading-none">
          <span>
            {t("app.welcomeTo")} {t("app.name")}
          </span>
          <small className="text-gray-300 font-medium">
            {isLoggedIn ? (
              <strong>{user.username}</strong>
            ) : (
              t("login.authText")
            )}
          </small>
        </div>
        <nav className="flex">
          <NavLink
            action={
              isLoggedIn
                ? () => dispatch(doLogout())
                : () => history.push(settings.ROUTES.LOG_IN)
            }
            icon={isLoggedIn ? LogOutIcon : LogInIcon}
            title={t(isLoggedIn ? "logout.title" : "login.title")}
          />
        </nav>
      </div>
    </header>
  )
}
