import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Container } from "./components/layout"
import Router from "./router"

const App = () => (
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

export default App
