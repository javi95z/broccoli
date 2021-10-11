import classNames from "classnames"
import styles from "../styles/tag.module.css"

const Tag = ({ backgroundColor = "bg-gray-600", className, children }) => {
  return (
    <span className={classNames(styles.tag, backgroundColor, className)}>
      {children}
    </span>
  )
}

export default Tag
