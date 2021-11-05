import classNames from "classnames"

/** @type {"primary"|"secondary"} */
const COLOR = {
  primary: "bg-green-700",
  secondary: "bg-gray-700"
}

/** @type {"sm"|"md"|"lg"} */
const SIZE = {
  sm: "h-8 px-3",
  md: "h-10 py-2 px-5",
  lg: "h-14 px-8"
}

/**
 * @param {Object} params
 * @param {COLOR} [params.color]
 * @param {SIZE} [params.size]
 * @param {Boolean} [params.disabled]
 * @param {String} [params.className]
 * @param {*} params.children
 * @param {Array} [params.props]
 * @returns {JSX.Element}
 */
const Button = ({
  color = "primary",
  size = "md",
  disabled = false,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={classNames(
        "flex justify-center items-center rounded-md shadow-md",
        disabled && "opacity-50 cursor-not-allowed",
        SIZE[size],
        COLOR[color],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

/**
 * @param {Object} params
 * @param {COLOR} [params.color]
 * @param {SIZE} [params.size]
 * @param {JSX.Element} params.icon
 * @param {Boolean} [params.disabled]
 * @param {*} params.children
 * @param {String} [params.className]
 * @param {Array} [params.props]
 * @returns {JSX.Element}
 */
const ButtonIcon = ({
  color = "primary",
  size = "md",
  icon,
  disabled = false,
  children,
  className,
  ...props
}) => {
  return (
    <Button
      className={className}
      color="secondary"
      disabled={disabled}
      {...props}
    >
      {icon}
      <span className="ml-2">{children}</span>
    </Button>
  )
}

export { Button, ButtonIcon }
