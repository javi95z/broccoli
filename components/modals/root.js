import classNames from "classnames"
import { useRef } from "react"
import { createPortal } from "react-dom"
import { useOnClickOutside } from "../../hooks"

/**
 * @param {Object} params
 * @param {Function} params.onClose
 * @param {*} params.children
 * @returns {JSX.Element}
 */
const RootModal = ({ onClose, children }) => {
  const ref = useRef()
  const element = document.getElementById("modal-root")
  useOnClickOutside(ref, onClose)

  const Portal = () => (
    <div className="splash-screen">
      <section
        ref={ref}
        className="flex flex-col items-center text-center text-gray-300 shadow-2xl w-5/6 sm:w-2/3 lg:w-1/3 xl:w-1/4 max-w-md"
      >
        <div className="bg-gray-900 bg-opacity-90 rounded-lg p-8 w-full">
          {children}
        </div>
      </section>
    </div>
  )

  return createPortal(<Portal />, element)
}

/**
 * @param {Object} params
 * @param {String} [params.className]
 * @param {*} params.children
 * @returns {JSX.Element}
 */
const Title = ({ className, children }) => (
  <div className="flex justify-center w-full">
    <h2
      className={classNames(
        "text-2xl leading-none tracking-tight font-bold w-2/3 mb-5",
        className
      )}
    >
      {children}
    </h2>
  </div>
)

/**
 * @param {*} params.children
 * @returns {JSX.Element}
 */
const Description = ({ children }) => (
  <span className="w-3/4 leading-tight text-sm text-gray-300">{children}</span>
)

export default RootModal
RootModal.Title = Title
RootModal.Description = Description
