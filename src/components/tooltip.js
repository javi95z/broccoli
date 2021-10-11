import { useState } from "react"
import classNames from "classnames"

const Tooltip = ({ title, className, children }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div
      className={classNames("relative", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {isVisible && (
        <span className="absolute -bottom-10 right-0 text-xs rounded-md min-w-min p-2 bg-gray-800 text-gray-200 truncate">
          {title}
        </span>
      )}
      {children}
    </div>
  )
}

export default Tooltip
