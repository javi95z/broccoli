import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { BroccoliIcon } from "../components/icons"
import settings from "../settings.json"

const Welcome = () => {
  const [t] = useTranslation()
  const { isLoggedIn } = useSelector(state => state.auth)
  const history = useHistory()

  useEffect(() => {
    isLoggedIn && history.replace(settings.ROUTES.USER_DEFAULT)
  }, [isLoggedIn])

  return (
    <>
      <section className="flex items-center justify-center w-full">
        <div className="flex flex-col justify-center">
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
