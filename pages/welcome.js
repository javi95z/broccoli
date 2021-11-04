import Image from "next/image"
import { useEffect } from "react"
import { useSelector } from "react-redux"
// import { useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { BroccoliIcon } from "../components/icons"
// import settings from "../src/settings.json"
import styles from "../styles/welcome.module.css"

const WelcomePage = () => {
  const [t] = useTranslation()
  // const { isLoggedIn } = useSelector(state => state.auth)
  // const history = useHistory()

  // useEffect(() => {
  //   isLoggedIn && history.replace(settings.ROUTES.USER_DEFAULT)
  // }, [isLoggedIn])

  return (
    <div className="relative flex flex-col gap-8 w-full">
      <section className={styles.mainSection}>
        <div className="absolute flex md:px-8 md:py-2 overflow-hidden">
          <Image
            src="/images/chart.png"
            layout="fill"
            className="opacity-25 h-full w-full object-cover transform scale-150 -translate-y-6 md:transform-none"
          />
        </div>
        <div className="flex flex-col z-10">
          <div className="flex flex-col items-center h-full">
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

      {/* Your crypto portfolio */}
      <section className={styles.secondarySection}>
        <div className={styles.sectionPartText}>
          <h1 className="text-4xl">{t("welcome.firstSectionTitle")}</h1>
          <p>{t("welcome.firstSectionText")}</p>
        </div>
        <div className={styles.sectionPartImage}>
          <Image
            src="/images/illustrations/wallet.png"
            width={285}
            height={285}
          />
        </div>
      </section>

      {/* Look over your finances */}
      <section
        className={`${styles.secondarySection} ${styles.sectionReverse}`}
      >
        <div className={styles.sectionPartImage}>
          <Image
            src="/images/illustrations/bank-note.png"
            width={285}
            height={285}
          />
        </div>
        <div className={`${styles.sectionPartText} ${styles.sectionPartRight}`}>
          <h1 className="text-4xl">{t("welcome.secondSectionTitle")}</h1>
          <p>{t("welcome.secondSectionText")}</p>
        </div>
      </section>
    </div>
  )
}

export default WelcomePage
