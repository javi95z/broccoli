import { Link } from "react-router-dom"
import classNames from "classnames"

const BackgroundImage = ({ image, width = 100, height = 100, link = null }) => (
  <div
    className={classNames(
      "absolute opacity-60 right-2 -bottom-3",
      link && "cursor-pointer"
    )}
  >
    {link && <Link to={link} className="absolute w-full h-full"></Link>}
    <img src={image} width={width} height={height} />
  </div>
)

export default BackgroundImage
