import { LoadIcon } from "../icons"

const Content = ({ isLoading, isError, errorText, children }) => {
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
        {errorText || "There was an error"}
      </p>
    </NoContent>
  ) : (
    <>{children}</>
  )
}

export default Content
