import { useState, useRef } from "react"
import { useOnClickOutside } from "../hooks"
import { AppsIcon } from "./icons"

const Dropdown = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef()
  useOnClickOutside(ref, () => setIsOpen(false))

  return (
    <div className="relative" ref={ref}>
      <button
        className="rounded-full hover:bg-gray-800 p-2.5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AppsIcon width={22} />
      </button>
      {isOpen && (
        <div className="absolute mt-1 right-0 z-20">
          <ul className="flex flex-col shadow-md rounded-md bg-gray-700 w-36 py-1">
            {items.map((item, index) => (
              <li
                key={index}
                className={`flex py-2 px-3 cursor-pointer hover:bg-gray-900 ${item.className}`}
                onClick={() => {
                  item.action()
                  setIsOpen(false)
                }}
              >
                {item.icon}
                <span className="text-sm font-normal ml-2">{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Dropdown
