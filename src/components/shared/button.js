import classNames from "classnames"

const COLOR = {
  primary: "bg-green-700",
  secondary: "bg-gray-700"
}

const Button = ({ color = "primary", disabled, children, ...props }) => {
  return (
    <button
      className={classNames(
        "py-2 px-5 rounded-md shadow-md",
        disabled && "opacity-50 cursor-not-allowed",
        COLOR[color]
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
