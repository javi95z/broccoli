import classNames from "classnames"

const COLOR = {
  primary: "bg-green-700",
  secondary: "bg-gray-700"
}

const SIZE = {
  sm: "h-8 px-3",
  md: "h-10 py-2 px-5",
  lg: "h-14 px-8"
}

const Button = ({
  color = "primary",
  size = "md",
  disabled,
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

const ButtonIcon = ({
  color = "primary",
  size = "md",
  icon,
  disabled,
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
