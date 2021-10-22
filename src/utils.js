const CURRENCY_OPTIONS = { style: "currency", currency: "USD" }
const DATE_UNITS = {
  month: 2592000,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1
}

/**
 * Check whether an object is empty or not
 * @returns {Boolean}
 */
export const isEmpty = value => !value || Object.keys(value).length === 0

/**
 * Check whether a number is negative or not
 * @returns {Boolean}
 */
export const isNegative = value => parseFloat(value) < 0

/**
 * Convert to currency format
 * Ex. $47,780.58
 * @returns {String}
 */
export const currencyFormat = value =>
  new Intl.NumberFormat("en-US", CURRENCY_OPTIONS).format(value)

/**
 * Convert to crypto format
 * Ex. BTC 0.0035
 * @returns {String}
 */
export const cryptoFormat = (value, symbol) =>
  new Intl.NumberFormat("default", {
    style: "currency",
    currency: symbol,
    maximumFractionDigits: 4,
    minimumFractionDigits: 0
  }).format(value)

/**
 * Convert to date format
 * Ex. 15 oct 2021
 * @returns {String}
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

/**
 * Convert a number to percentage
 * @param {Number} value
 * @returns {String}
 */
export const percentFormat = value => {
  if (!value || isNaN(value)) return
  const symbol = !isNegative(value) ? "+" : ""
  const decimals = Math.abs(value) > 100 ? 0 : 2
  const number = parseFloat(value).toFixed(decimals)
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

/**
 * Convert date to human readable format
 * @param {*} date Date to be converted
 * @returns {String}
 */
export const getTimeAgo = date => {
  const timestamp = new Date(date).getTime()
  const rtf = new Intl.RelativeTimeFormat("en-US")
  const secondsElapsed = getSecondsDiff(timestamp)
  const { value, unit } = getUnitAndValueDate(secondsElapsed)
  return value && unit ? rtf.format(value, unit) : ""
}

export const parseSelectItem = data => {
  return {
    id: data._id || data.id,
    value: data.name,
    image: data.image
  }
}
