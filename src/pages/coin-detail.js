import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { AppLayout, Content } from "../components/layout"
import { useGetRequest } from "../hooks"
import { isEmpty } from "../utils"

const CoinDetail = () => {
  const { id } = useParams()
  const { attemptRequest, loading, error } = useGetRequest(`/coins/${id}`)
  const [data, setData] = useState(null)

  const fetchData = async () => {
    const response = await attemptRequest()
    response && setData(response)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  return (
    <AppLayout>
      <Content isLoading={loading} isError={isEmpty(data)} errorText={error}>
        {!isEmpty(data) && data.name}
      </Content>
    </AppLayout>
  )
}

export default CoinDetail
