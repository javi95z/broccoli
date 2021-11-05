import classNames from "classnames"
import styles from "../styles/tag.module.css"

/**
 * @param {Object} params
 * @param {String} [params.backgroundColor]
 * @param {String} [params.className]
 * @param {*} params.children
 * @returns {JSX.Element}
 */
const Tag = ({ backgroundColor = "bg-gray-600", className, children }) => {
  return (
    <span className={classNames(styles.tag, backgroundColor, className)}>
      {children}
    </span>
  )
}

export default Tag
