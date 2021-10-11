import settings from "../../settings.json"
import { Link } from "react-router-dom"

export default function Footer() {
  const linkedIn = "https://www.linkedin.com/in/javier-monfort/"

  const DateRange = () => {
    const currentYear = new Date().getFullYear()
    return currentYear === settings.SETUP_DATE
      ? currentYear
      : `${settings.SETUP_DATE} - ${currentYear}`
  }

  return (
    <footer className="flex justify-between items-center h-14 w-full px-16 text-sm bottom-0">
      <div className="text-gray-400">
        Created by{" "}
        <Link
          className="text-green-500"
          to={linkedIn}
          target="_blank"
          rel="noreferrer"
        >
          Javier
        </Link>
      </div>
      <div className="text-gray-400">
        Copyright &copy; <DateRange />
      </div>
    </footer>
  )
}
