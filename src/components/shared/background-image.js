import { useHistory } from "react-router"
import classNames from "classnames"

const BackgroundImage = ({ image, width = 100, height = 100, link = null }) => (
  <div
    className={classNames(
      "absolute opacity-60 right-2 -bottom-3",
      link && "cursor-pointer"
    )}
  >
    {link && <a href={link} className="absolute w-full h-full"></a>}
    <img src={image} width={width} height={height} />
  </div>
)

export default BackgroundImage
