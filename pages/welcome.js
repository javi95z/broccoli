import Image from "next/image"
import { useTranslation } from "react-i18next"
import { BroccoliIcon } from "../components/icons"
import styles from "../styles/welcome.module.css"

const WelcomePage = () => {
  const [t] = useTranslation()

  return (
    <div className="relative flex flex-col gap-24 md:gap-8 w-full">
      <section className={styles.mainSection}>
        <div className="absolute flex md:px-8 md:py-2 overflow-hidden">
          <Image
            src="/images/chart.png"
            width={1200}
            height={630}
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
        <div className="flex flex-col gap-6 justify-center text-center md:text-left h-full w-2/3 md:w-1/2">
          <h1 className="text-4xl">{t("welcome.firstSectionTitle")}</h1>
          <p>{t("welcome.firstSectionText")}</p>
        </div>
        <div className="flex justify-end w-2/3 md:w-1/2">
          <Image
            src="/images/illustrations/wallet.png"
            width={300}
            height={300}
          />
        </div>
      </section>

      {/* Look over your finances */}
      <section
        className={`${styles.secondarySection} ${styles.sectionReverse}`}
      >
        <div className="flex w-2/3 md:w-1/2">
          <Image
            src="/images/illustrations/bank-note.png"
            width={300}
            height={300}
          />
        </div>
        <div className="flex flex-col gap-6 justify-center text-center md:text-right h-full w-2/3 md:w-1/2">
          <h1 className="text-4xl">{t("welcome.secondSectionTitle")}</h1>
          <p>{t("welcome.secondSectionText")}</p>
        </div>
      </section>
    </div>
  )
}

export default WelcomePage
