import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { sortAlphabetically } from "../utils"
import constants from "../constants/nationalities.json"

export const useNationalities = () => {
  const [t] = useTranslation()
  const [data, setData] = useState([])

  useEffect(() => {
    const translated = constants.map(x => {
      return { ...x, value: t(`countries.${x.value}`) }
    })
    const sorted = sortAlphabetically(translated, "value", "desc")
    setData(sorted)
  }, [constants])

  return data
}
