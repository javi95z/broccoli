import { useHistory } from "react-router-dom"
import { AddIcon } from "./icons"

const FabButton = ({ route, ...props }) => {
  const history = useHistory()

  const onRedirect = () => history.push(route)

  return (
    <div>
      <button
        onClick={onRedirect}
        className="fixed bottom-8 right-8 bg-green-600 rounded-full shadow-xl p-2"
        {...props}
      >
        <AddIcon width={36} className="on-hover-rotate" />
      </button>
    </div>
  )
}

export default FabButton
