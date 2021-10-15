import { useRef } from "react"
import { createPortal } from "react-dom"
import { useOnClickOutside } from "../../hooks"

const RootModal = ({ onClose, children }) => {
  const ref = useRef()
  const element = document.getElementById("modal-root")
  useOnClickOutside(ref, onClose)

  const Portal = () => (
    <div className="splash-screen">
      <section
        ref={ref}
        className="flex flex-col items-center text-center text-gray-300 shadow-2xl"
      >
        <div className="bg-gray-900 bg-opacity-90 rounded-lg p-8">
          {children}
        </div>
      </section>
    </div>
  )

  return createPortal(<Portal />, element)
}

export default RootModal
