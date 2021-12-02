import Image from "next/image"
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
      {illustration && (
        <Image
          src={illustration}
          width={250}
          height={250}
          className="object-contain opacity-30"
        />
      )}
      <div className="absolute">
        <p className="text-lg text-center text-gray-200 italic z-10">
          {errorText || t("common.errors.standard")}
        </p>
      </div>
    </NoContent>
  ) : (
    <>{children}</>
  )
}

export default Content
