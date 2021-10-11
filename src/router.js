import { Switch, Route } from "react-router-dom"
import Dashboard from "./pages/dashboard"
import Welcome from "./pages/welcome"
import InjectInterceptors from "./components/inject-interceptors"
import { TransactionModal } from "./components/modals"
import { LoginModal, SignupModal } from "./components/modals/auth"
import settings from "./settings.json"

const Router = () => (
  <>
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
  </>
)

export default Router
