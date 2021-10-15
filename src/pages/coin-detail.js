import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { AppLayout, Content } from "../components/layout"
import { useGetRequest } from "../hooks"

const CoinDetail = () => {
  const { id } = useParams()
  const { attemptRequest, loading } = useGetRequest(`/coins/${id}`)
  const [data, setData] = useState(null)

  const fetchData = async () => {
    const response = await attemptRequest()
    setData(response)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  return (
    <AppLayout>
      <Content isLoading={loading} isError={!data}>
        {data.name}
      </Content>
    </AppLayout>
  )
}

export default CoinDetail
