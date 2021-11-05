import Link from "next/link"
import Image from "next/image"
import classNames from "classnames"

/**
 * @param {Object} params
 * @param {String} params.image
 * @param {Number} [params.width]
 * @param {Number} [params.height]
 * @param {String} [params.link]
 * @param {String} [params.className]
 * @returns {JSX.Element}
 */
const BackgroundImage = ({
  image,
  width = 100,
  height = 100,
  link = null,
  className
}) => {
  if (!image) return null

  const imageCmp = <Image src={image} width={width} height={height} />

  return (
    <div
      className={classNames(
        "absolute opacity-60 right-2 -bottom-3",
        link && "cursor-pointer",
        className
      )}
    >
      {link ? (
        <Link href={link} className="absolute w-full h-full">
          {imageCmp}
        </Link>
      ) : (
        imageCmp
      )}
    </div>
  )
}

export default BackgroundImage
