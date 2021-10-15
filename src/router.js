import { Switch, Route } from "react-router-dom"
import Dashboard from "./pages/dashboard"
import Welcome from "./pages/welcome"
import InjectInterceptors from "./components/inject-interceptors"
import settings from "./settings.json"

const Router = () => (
  <>
    <InjectInterceptors />
    <Switch>
      <Route path={settings.ROUTES.DASHBOARD}>
        <Dashboard />
      </Route>
      <Route path={settings.ROUTES.ROOT}>
        <Welcome />
      </Route>
    </Switch>
  </>
)

export default Router
