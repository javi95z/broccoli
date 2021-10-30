import { useEffect } from "react"
import { useHistory, useParams } from "react-router"
import classNames from "classnames"
import settings from "../../settings.json"

const TabGroup = ({ items, activeItem, setActiveItem, children }) => {
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    setActiveItem(id)
  }, [id])

  const onClick = item => {
    setActiveItem(item)
    history.push(`${settings.ROUTES.USER}/${item}`)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-around items-center h-16 gap-3 mb-4">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => onClick(item)}
            className={classNames(
              "flex justify-center items-center w-full rounded-md text-center py-4",
              activeItem === item ? "bg-gray-900" : "cursor-pointer"
            )}
          >
            <span className="font-medium capitalize">{item}</span>
          </div>
        ))}
      </div>
      <div className="h-full">{children}</div>
    </div>
  )
}

const Tab = ({ isVisible, children }) => {
  if (!isVisible) return null

  return (
    <div className="bg-gray-900 h-full w-full rounded-md p-4">{children}</div>
  )
}

export default TabGroup
TabGroup.Tab = Tab
