import classNames from "classnames"

const Overlay = ({ className, children }) => {
  return (
    <div
      className={classNames(
        "absolute inset-0 flex items-center justify-center backdrop-filter backdrop-blur-sm z-10",
        className
      )}
    >
      {children}
    </div>
  )
}

export default Overlay
