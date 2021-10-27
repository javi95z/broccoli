export const FormLabel = ({ children, ...props }) => (
  <label
    className="text-left text-sm font-medium text-gray-500 mb-1"
    {...props}
  >
    {children}
  </label>
)

export const FormError = ({ children }) => (
  <p className="text-left text-sm font-medium text-red-700 -mt-3 mb-3">
    {children}
  </p>
)

export const FormSubtitle = ({ children }) => (
  <p className="text-left text-xs font-medium text-gray-400 -mt-3 mb-3">
    {children}
  </p>
)
