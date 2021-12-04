import classNames from "classnames"

/** @type {"sm"|"md"|"lg"|"xl"} */
const SIZE = {
  sm: "p-1",
  md: "p-2",
  lg: "p-3",
  xl: "p-4"
}

/**
 * @param {Object} params
 * @param {SIZE} [params.size]
 * @param {*} params.children
 * @param {Array} [params.props]
 * @returns {JSX.Element}
 */
const FabButton = ({ size = "md", children, ...props }) => (
  <div>
    <button
      className={classNames(
        "fixed bottom-8 right-8 bg-green-600 rounded-full shadow-xl",
        SIZE[size]
      )}
      {...props}
    >
      {children}
    </button>
  </div>
)

export default FabButton
