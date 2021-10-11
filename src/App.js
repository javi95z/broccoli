import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Welcome from "./pages/welcome"
import Dashboard from "./pages/dashboard"
import { Container } from "./components/layout"
import InjectInterceptors from "./components/inject-interceptors"
import { TransactionModal } from "./components/modals"
import { LoginModal, SignupModal } from "./components/modals/auth"
import settings from "./settings.json"

const App = () => (
  <section>
    <Router>
      <Container>
        <InjectInterceptors />
        <Switch>
          <Route path={settings.ROUTES.DASHBOARD}>
            <Dashboard />
          </Route>
          <Route path={settings.ROUTES.LOG_IN}>
            <LoginModal />
          </Route>
          <Route path={settings.ROUTES.SIGN_UP}>
            <SignupModal />
          </Route>
          <Route path="/add-transaction">
            <TransactionModal />
          </Route>
          <Route path={settings.ROUTES.ROOT}>
            <Welcome />
          </Route>
        </Switch>
      </Container>
    </Router>
    <div id="modal-root"></div>
  </section>
)

export default App
