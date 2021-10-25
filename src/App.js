import { useEffect } from "react"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Container } from "./components/layout"
import {
  useGetHoldings,
  useGetPortfolio,
  useLatestTransactions
} from "./services"
import Router from "./router"

const App = () => {
  const portfolioSvc = useGetPortfolio()
  const holdingsSvc = useGetHoldings()
  const transactionsSvc = useLatestTransactions()

  useEffect(() => {
    holdingsSvc.fetch()
    transactionsSvc.fetch()
    portfolioSvc.fetch()
  }, [])

  return (
    <section>
      <BrowserRouter>
        <Container>
          <Router />
        </Container>
      </BrowserRouter>
      <ToastContainer
        autoClose={5000}
        closeButton={false}
        limit={5}
        closeOnClick
        draggable
        pauseOnHover
      />
      <div id="modal-root"></div>
    </section>
  )
}

export default App
