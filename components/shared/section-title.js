import Link from "next/link"
import { ChevronRightIcon } from "../icons"

/**
 * @param {Object} params
 * @param {String} [params.link]
 * @param {String} [params.titleLink]
 * @param {*} params.children
 * @returns {JSX.Element}
 */
const SectionTitle = ({ link, titleLink, children }) => (
  <div className="flex justify-between items-center w-full">
    <h1 className="page-title">{children}</h1>
    {link && (
      <Link href={link} className="flex text-lg on-hover-enlarge">
        <a>
          <span className="mr-1">{titleLink}</span>
          <ChevronRightIcon width={18} />
        </a>
      </Link>
    )}
  </div>
)

export default SectionTitle
