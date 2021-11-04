import { Link } from "react-router-dom"
import { ChevronRightIcon } from "../icons"

const SectionTitle = ({ titleLink, link, children }) => (
  <div className="flex justify-between items-center w-full">
    <h1 className="page-title">{children}</h1>
    {link && (
      <Link to={link} className="flex text-lg on-hover-enlarge">
        <span className="mr-1">{titleLink}</span>
        <ChevronRightIcon width={18} />
      </Link>
    )}
  </div>
)

export default SectionTitle
