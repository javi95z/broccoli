import classNames from "classnames"

const TabGroup = ({ items, activeItem, setActiveItem, children }) => (
  <div className="flex flex-col h-full">
    <div className="flex justify-around items-center h-16 gap-3 mb-4">
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => setActiveItem(item)}
          className={classNames(
            "flex justify-center items-center w-full rounded-md text-center py-4",
            activeItem === item ? "bg-gray-900" : "cursor-pointer"
          )}
        >
          <span className="font-medium">{item}</span>
        </div>
      ))}
    </div>
    <div className="h-full">{children}</div>
  </div>
)

const Tab = ({ isVisible, children }) => {
  if (!isVisible) return null

  return (
    <div className="bg-gray-900 h-full w-full rounded-md p-4">{children}</div>
  )
}

export default TabGroup
TabGroup.Tab = Tab
