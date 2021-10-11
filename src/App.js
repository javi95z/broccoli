import { BrowserRouter } from "react-router-dom"
import { Container } from "./components/layout"
import Router from "./router"

const App = () => (
  <section>
    <BrowserRouter>
      <Container>
        <Router />
      </Container>
    </BrowserRouter>
    <div id="modal-root"></div>
  </section>
)

export default App
