import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { BroccoliIcon } from "../components/icons"
import settings from "../settings.json"
import chartImage from "../images/chart.png"

const Welcome = () => {
  const [t] = useTranslation()
  const { isLoggedIn } = useSelector(state => state.auth)
  const history = useHistory()

  useEffect(() => {
    isLoggedIn && history.replace(settings.ROUTES.USER_DEFAULT)
  }, [isLoggedIn])

  return (
    <>
      <section className="relative flex items-center justify-center w-full">
        <div className="absolute flex justify-center md:px-8 md:py-2">
          <img src={chartImage} className="opacity-20 h-full w-full" />
        </div>
        <div className="flex flex-col justify-center z-10">
          <div className="flex flex-col justify-center items-center h-full rounded-3xl">
            <BroccoliIcon
              className="animate-bounce text-white fill-current"
              width={60}
              height={60}
            />
            <h1 className="text-5xl text-center mt-4">{t("app.welcomeTo")}</h1>
            <span className="text-7xl font-bold text-green-500 tracking-tight -mt-2">
              {t("app.name")}
            </span>
          </div>
        </div>
      </section>
    </>
  )
}

export default Welcome
