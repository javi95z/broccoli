import classNames from "classnames"
import { LoadIcon } from "../icons"

const Submit = ({ disabled, loading, children, ...props }) => {
  return (
    <button
      type="submit"
      className={classNames(
        "rounded shadow-lg inline-flex justify-center items-center bg-gray-700 h-10 px-5 mt-2",
        (disabled || loading) && "opacity-50 cursor-not-allowed"
      )}
      disabled={disabled}
      {...props}
    >
      {loading ? (
        <LoadIcon className="animate-spin text-white fill-current" width={18} />
      ) : (
        children
      )}
    </button>
  )
}

export default Submit
