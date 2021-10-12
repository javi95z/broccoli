import { useTranslation } from "react-i18next"
import { LoadIcon } from "../icons"

const Content = ({ isLoading, isError, errorText, children }) => {
  const [t] = useTranslation()

  const NoContent = ({ children }) => (
    <div className="flex justify-center items-center h-full">{children}</div>
  )

  return isLoading ? (
    <NoContent>
      <LoadIcon width={50} className="text-white fill-current animate-spin" />
    </NoContent>
  ) : isError ? (
    <NoContent>
      <p className="text-gray-400 italic">
        {errorText || t("common.errors.standard")}
      </p>
    </NoContent>
  ) : (
    <>{children}</>
  )
}

export default Content
