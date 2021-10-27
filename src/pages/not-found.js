import { Link } from "react-router-dom"
import { AppLayout } from "../components/layout"
import { Button } from "../components/shared"
import settings from "../settings.json"
import notFoundImg from "../images/not-found.png"

const NotFoundPage = () => (
  <AppLayout>
    <div className="flex flex-col items-center gap-4 justify-start h-full">
      <h1 className="text-4xl font-semibold z-10">Not found</h1>
      <p className="z-10">We couldn't find what you were looking for.</p>
      <Link className="z-10" to={settings.ROUTES.ROOT}>
        <Button>Go to homepage</Button>
      </Link>
      <img src={notFoundImg} className="absolute opacity-25" />
    </div>
  </AppLayout>
)

export default NotFoundPage
