import { Switch, Route } from "react-router-dom"
import Dashboard from "./pages/dashboard"
import Welcome from "./pages/welcome"
import CoinDetail from "./pages/coin-detail"
import { Init, Interceptors } from "./providers"
import settings from "./settings.json"

const Router = () => (
  <>
    <Interceptors />
    <Init />
    <Switch>
      <Route path={settings.ROUTES.DASHBOARD}>
        <Dashboard />
      </Route>
      <Route path="/coins/:id">
        <CoinDetail />
      </Route>
      <Route path={settings.ROUTES.ROOT}>
        <Welcome />
      </Route>
    </Switch>
  </>
)

export default Router
