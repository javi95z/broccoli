const CURRENCY_OPTIONS = { style: "currency", currency: "USD" }
const DATE_UNITS = {
  month: 2592000,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1
}

/**
 * Check whether a number is negative or not
 * @returns {boolean}
 */
export const isNegative = value => parseFloat(value) < 0

/**
 * Convert to currency format
 * Ex. $47,780.58
 * @returns
 */
export const currencyFormat = value =>
  new Intl.NumberFormat("en-US", CURRENCY_OPTIONS).format(value)

/**
 * Convert to date format
 * Ex. 15 oct 2021
 * @returns {string}
 */
export const dateFormat = value => {
  const date = new Date(value)
  return new Intl.DateTimeFormat("default", {
    dateStyle: "medium"
  }).format(date)
}

export const datetimeFormat = value => {
  const date = new Date(value)
  return new Intl.DateTimeFormat("default", {
    dateStyle: "medium",
    timeStyle: "medium"
  }).format(date)
}

export const percentFormat = value => {
  if (!value || isNaN(value)) return
  const symbol = !isNegative(value) ? "+" : ""
  const number = value.toFixed(Math.abs(value) > 100 ? 0 : 2)
  const percent = Intl.NumberFormat("default").format(number)
  return `${symbol}${percent}%`
}

const getSecondsDiff = timestamp => (Date.now() - timestamp) / 1000
const getUnitAndValueDate = secondsElapsed => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === "second") {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1
      return { value, unit }
    }
  }
}
export const getTimeAgo = date => {
  const timestamp = new Date(date).getTime()
  const rtf = new Intl.RelativeTimeFormat("en-US")
  const secondsElapsed = getSecondsDiff(timestamp)
  const { value, unit } = getUnitAndValueDate(secondsElapsed)
  return rtf.format(value, unit)
}

export const parseSelectItem = data => {
  return {
    id: data._id || data.id,
    value: data.name,
    image: data.image
  }
}
