import { useSelector } from "react-redux"
import { useUnauthorized } from "../../hooks"

const AppLayout = ({ children }) => {
  const { isLoggedIn } = useSelector(state => state.auth)
  useUnauthorized()

  return (
    isLoggedIn && (
      <section className="relative flex flex-col flex-grow max-w-full px-4 sm:px-8 py-2">
        {children}
      </section>
    )
  )
}

export default AppLayout
