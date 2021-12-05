import { useTranslation } from "react-i18next"
import settings from "../../settings.json"

const Footer = () => {
  const [t] = useTranslation()
  const linkedIn = "https://www.linkedin.com/in/javier-monfort/"

  const DateRange = () => {
    const currentYear = new Date().getFullYear()
    return currentYear === settings.SETUP_DATE
      ? currentYear
      : `${settings.SETUP_DATE} - ${currentYear}`
  }

  return (
    <footer className="flex flex-col gap-2 sm:flex-row items-center sm:justify-between h-28 w-full p-8 sm:px-16 text-sm bottom-0">
      <div className="text-gray-400">
        {t("copy.createdBy")}{" "}
        <a
          className="text-green-500 hover:underline"
          href={linkedIn}
          target="_blank"
          rel="noreferrer"
        >
          Javier
        </a>
      </div>
      <div className="text-gray-400">
        {t("copy.copyright")} &copy; <DateRange />
      </div>
    </footer>
  )
}

export default Footer
