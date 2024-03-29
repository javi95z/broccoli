/**
 * @param {Object} params
 * @param {*} params.children
 * @returns {JSX.Element}
 */
const CardRoot = ({ children }) => (
  <div className="rounded-md shadow-md w-full bg-gray-800">{children}</div>
)

export default CardRoot
