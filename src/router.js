import { Switch, Route } from "react-router-dom"
import DashboardPage from "./pages/dashboard"
import WelcomePage from "./pages/welcome"
import ProfilePage from "./pages/profile"
import CoinDetailPage from "./pages/coin-detail"
import NotFoundPage from "./pages/not-found"
import { Init, Interceptors } from "./providers"
import settings from "./settings.json"

const Router = () => (
  <>
    <Interceptors />
    <Init />
    <Switch>
      <Route path={settings.ROUTES.DASHBOARD} component={DashboardPage} />
      <Route path={`${settings.ROUTES.COINS}/:id`} component={CoinDetailPage} />
      <Route path={`${settings.ROUTES.USER}/:id?`} component={ProfilePage} />
      <Route path={settings.ROUTES.NOT_FOUND} component={NotFoundPage} />
      <Route path={settings.ROUTES.ROOT} component={WelcomePage} />
    </Switch>
  </>
)

export default Router
