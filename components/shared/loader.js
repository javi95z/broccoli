import classNames from "classnames"
import styles from "../../styles/loader.module.css"

/**
 * @param {Object} params
 * @param {String} [params.className]
 * @returns {JSX.Element}
 */
const Loader = ({ className }) => (
  <div className={classNames(styles.loader, className)}></div>
)

export default Loader
