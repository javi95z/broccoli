import { Switch, Route } from "react-router-dom"
import DashboardPage from "./pages/dashboard"
import WelcomePage from "./pages/welcome"
import UserPage from "./pages/user"
import CoinDetailPage from "./pages/coin-detail"
import { Init, Interceptors } from "./providers"
import settings from "./settings.json"

const Router = () => (
  <>
    <Interceptors />
    <Init />
    <Switch>
      <Route path={settings.ROUTES.DASHBOARD}>
        <DashboardPage />
      </Route>
      <Route path={`${settings.ROUTES.COINS}/:id`}>
        <CoinDetailPage />
      </Route>
      <Route path={settings.ROUTES.USER}>
        <UserPage />
      </Route>
      <Route path={settings.ROUTES.ROOT}>
        <WelcomePage />
      </Route>
    </Switch>
  </>
)

export default Router
