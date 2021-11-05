import classNames from "classnames"
import { isNegative } from "../../utils"

/**
 * @param {Object} params
 * @param {Number} params.data
 * @param {Function} [params.filter]
 * @param {Boolean} [params.withSymbol]
 * @param {String} [params.className]
 * @returns {JSX.Element}
 */
const SignFigure = ({ data, filter, withSymbol = false, className }) => {
  const negative = isNegative(data)
  return (
    <span
      className={classNames(
        className,
        negative ? "text-red-800" : "text-green-600"
      )}
    >
      {withSymbol && (negative ? "-" : "+")}
      {filter ? filter(data) : data}
    </span>
  )
}

export default SignFigure
