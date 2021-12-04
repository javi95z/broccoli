import Image from "next/image"
import classNames from "classnames"

/**
 * @param {Object} params
 * @param {String} params.image
 * @param {Number} [params.width]
 * @param {Number} [params.height]
 * @param {String} [params.className]
 * @returns {JSX.Element}
 */
const BackgroundImage = ({ image, width = 100, height = 100, className }) => {
  if (!image) return null

  return (
    <div
      className={classNames("absolute opacity-60 right-2 -bottom-3", className)}
    >
      <Image src={image} width={width} height={height} />
    </div>
  )
}

export default BackgroundImage
