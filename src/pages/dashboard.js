import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { AppLayout } from "../components/layout"
import Content from "../components/layout/content"
// import { PositionModal } from "../components/modals"
import FabButton from "../components/fab-button"
import { PositionRow } from "../components/positions"
import { useGetPositions } from "../services/positions"

const Dashboard = () => {
  const fetchData = useGetPositions()
  const positionsSvc = useSelector(state => state.positions)
  const history = useHistory()
  // const [showPositionModal, setShowPositionModal] = useState(false)

  const onInit = async () => {
    await fetchData()
  }

  useEffect(() => {
    onInit()
  }, [])

  return (
    <AppLayout>
      <Content>
        <h1 className="page-title">Open positions</h1>
        <Content
          isError={!positionsSvc.data?.length}
          isLoading={positionsSvc.loading}
          errorText={"You have no open positions"}
        >
          {/* Open positions */}
          <div className="flex flex-col gap-2 min-w-min my-6">
            {positionsSvc.data.map((p, i) => (
              <PositionRow key={i} data={p} hasStatus={false} />
            ))}
          </div>
        </Content>

        <FabButton onClick={() => history.push("/add-position")} />
      </Content>
    </AppLayout>
  )
}

export default Dashboard
