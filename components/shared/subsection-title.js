/**
 *
 * @param {Object} params
 * @param {String} params.title
 * @param {String} [params.subtitle]
 * @returns {JSX.Element}
 */
const SubsectionTitle = ({ title, subtitle }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-bold">{title}</h2>
      {subtitle && <span className="text-xs">{subtitle}</span>}
    </div>
  )
}

export default SubsectionTitle
