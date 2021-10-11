import { useRef } from "react"
import { useHistory } from "react-router-dom"
import { useOnClickOutside } from "../../hooks"

const RootModal = ({ children }) => {
  const ref = useRef()
  const history = useHistory()
  // const element = document.getElementById("modal-root")
  useOnClickOutside(ref, () => history.goBack())

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

  // return createPortal(<Portal />, element)
  return <Portal />
}

export default RootModal
