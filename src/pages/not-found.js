import { Link } from "react-router-dom"
import { AppLayout } from "../components/layout"
import settings from "../settings.json"
import notFoundImg from "../images/not-found.png"

const NotFoundPage = () => (
  <AppLayout>
    <div className="flex flex-col items-center gap-4 justify-start h-full">
      <h1 className="text-4xl font-semibold z-10">Not found</h1>
      <p className="z-10">We couldn't find what you were looking for.</p>
      <Link
        to={settings.ROUTES.ROOT}
        className="bg-green-700 py-2 px-5 rounded-md shadow-md z-10"
      >
        Go to homepage
      </Link>
      <img src={notFoundImg} className="absolute opacity-25" />
    </div>
  </AppLayout>
)

export default NotFoundPage
