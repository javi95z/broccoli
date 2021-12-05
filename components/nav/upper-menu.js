import Link from "next/link"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { AnalyticsIcon, PersonCircleIcon } from "../icons"
import settings from "../../settings.json"

const UpperMenu = () => {
  const [t] = useTranslation()
  const { user } = useSelector(state => state.auth)

  /**
   * @param {Object} params
   * @param {String} params.title
   * @param {String} params.link
   * @param {JSX.Element} [params.icon]
   * @param {String} [params.image]
   * @returns {JSX.Element}
   */
  const NavItem = ({ title, link, icon, image }) => {
    const Icon = icon || null
    return (
      <Link href={link}>
        <a>
          <div className="flex items-center gap-2 text-sm rounded-md hover:bg-gray-700 py-1 px-3">
            {icon && (
              <Icon
                className="on-hover-enlarge fill-current font-bold"
                width={25}
                height={25}
              />
            )}
            {image && (
              <img
                src={user.avatar}
                className="rounded-full"
                width={25}
                height={25}
              />
            )}
            <span>{title}</span>
          </div>
        </a>
      </Link>
    )
  }

  return (
    <div className="flex">
      {/* Explore link */}
      <NavItem
        link={settings.ROUTES.EXPLORE}
        title={t("menu.explore")}
        icon={AnalyticsIcon}
      />
      {/* My user link */}
      <NavItem
        link={settings.ROUTES.USER}
        title={t("menu.myUser")}
        image={user.avatar ? user.avatar : null}
        icon={user.avatar ? null : PersonCircleIcon}
      />
    </div>
  )
}

export default UpperMenu
