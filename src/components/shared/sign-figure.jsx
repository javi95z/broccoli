import classNames from "classnames"
import { isNegative } from "../../utils"

const SignFigure = ({ className, data, filter, withSymbol = false }) => {
  const negative = isNegative(data)
  return (
    <span
      className={classNames(
        className,
        negative ? "text-red-800" : "text-green-600"
      )}
    >
      {withSymbol && (negative ? '-' : '+')}
      {filter ? filter(data) : data}
    </span>
  )
}

export default SignFigure
