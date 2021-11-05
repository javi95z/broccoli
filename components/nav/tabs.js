import { useRouter } from "next/router"
import classNames from "classnames"
import settings from "../../settings.json"

/**
 * @param {Object} params
 * @param {String[]} params.items
 * @param {String} params.activeItem
 * @param {Function} params.setActiveItem
 * @param {*} params.children
 * @returns {JSX.Element}
 */
const TabGroup = ({ items, activeItem, setActiveItem, children }) => {
  const router = useRouter()

  const onClick = item => {
    setActiveItem(item)
    router.push(`${settings.ROUTES.USER}/${item}`)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center w-full h-16 gap-3 mb-4 overflow-hidden">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => onClick(item)}
            className={classNames(
              "flex justify-center items-center w-full rounded-md truncate text-center py-4 px-2",
              activeItem === item ? "bg-gray-900" : "cursor-pointer"
            )}
          >
            <span className="font-medium truncate capitalize">{item}</span>
          </div>
        ))}
      </div>
      <div className="h-full">{children}</div>
    </div>
  )
}

/**
 * @param {Object} params
 * @param {Boolean} params.isVisible
 * @param {*} params.children
 * @returns {JSX.Element}
 */
const Tab = ({ isVisible, children }) => {
  if (!isVisible) return null

  return (
    <div className="bg-gray-900 h-full w-full rounded-md p-4">{children}</div>
  )
}

export default TabGroup
TabGroup.Tab = Tab
