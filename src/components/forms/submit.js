import { Button } from "../shared"
import { LoadIcon } from "../icons"

const Submit = ({ disabled, loading, children, ...props }) => {
  return (
    <Button type="submit" color="secondary" disabled={disabled} {...props}>
      {loading ? (
        <LoadIcon className="animate-spin text-white fill-current" width={18} />
      ) : (
        children
      )}
    </Button>
  )
}

export default Submit
