import classNames from "classnames"
import { isNegative } from "../../utils"

const SignFigure = ({ className, data, filter }) => (
  <span
    className={classNames(
      className,
      isNegative(data) ? "text-red-800" : "text-green-600"
    )}
  >
    {filter ? filter(data) : data}
  </span>
)

export default SignFigure
