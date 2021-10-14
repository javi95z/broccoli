import { ChevronRightIcon } from "../icons"

const SectionTitle = ({ titleLink, link, children }) => (
  <div className="flex justify-between items-center w-full">
    <h1 className="page-title">{children}</h1>
    {link && (
      <a href={link} className="flex text-lg on-hover-enlarge">
        <span className="mr-1">{titleLink}</span>
        <ChevronRightIcon width={18} />
      </a>
    )}
  </div>
)

export default SectionTitle
