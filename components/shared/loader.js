import classNames from "classnames"
import styles from "../../styles/loader.module.css"

const Loader = ({ className }) => (
  <div className={classNames(styles.loader, className)}></div>
)

export default Loader
