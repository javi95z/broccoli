import { useTranslation } from "react-i18next"
import { Loader } from "../shared"

const Content = ({ isLoading, isError, errorText, illustration, children }) => {
  const [t] = useTranslation()

  const NoContent = ({ children }) => (
    <div className="relative flex flex-col justify-center items-center h-60">
      {children}
    </div>
  )

  return isLoading ? (
    <NoContent>
      <Loader />
    </NoContent>
  ) : isError ? (
    <NoContent>
      <img className="absolute opacity-30 h-full" src={illustration} />
      <p className="text-lg text-gray-200 italic z-10">
        {errorText || t("common.errors.standard")}
      </p>
    </NoContent>
  ) : (
    <>{children}</>
  )
}

export default Content
