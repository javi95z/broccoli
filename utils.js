const CURRENCY_OPTIONS = {
  style: "currency",
  currency: "USD",
  currencyDisplay: "narrowSymbol",
  signDisplay: "never"
}
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
  new Intl.NumberFormat("default", CURRENCY_OPTIONS).format(value || 0)

/**
 * Convert to crypto format
 * Ex. BTC 0.0035
 * @param {Number} value
 * @param {String} symbol
 * @returns {String}
 */
export const cryptoFormat = (value, symbol) => {
  const number = new Intl.NumberFormat("default", {
    maximumFractionDigits: 4,
    minimumFractionDigits: 0
  }).format(value)
  return `${number} ${symbol}`
}

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
 * @param {Boolean} withDecimals Show or hide decimal numbers
 * @param {Boolean} withSymbol Show or hide plus/minus symbol
 * @returns {String}
 */
export const percentFormat = (
  value,
  withDecimals = true,
  withSymbol = true
) => {
  if (!value || isNaN(value)) return
  const symbol = withSymbol && !isNegative(value) ? "+" : ""
  const decimals = Math.abs(value) > 100 || !withDecimals ? 0 : 2
  const number = parseFloat(value).toFixed(decimals)
  const percent = Intl.NumberFormat("default").format(number)
  return `${symbol}${percent}%`
}

/**
 * @param {String} value
 * @example
 * toPopulateDate("1998-09-20T00:00:00.000Z")
 * returns "1998-09-20"
 * @returns {String}
 */
export const toPopulateDate = value => {
  if (!value) return null
  const date = new Date(value).toISOString()
  return date.substr(0, 10)
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

/**
 * Get user token from local storage
 * @returns {String|null}
 */
export const getToken = () => {
  const user = localStorage.getItem("user")
  if (user) {
    const { token } = JSON.parse(user)
    return token
  }
  return null
}

/**
 * Sort array of objects by key alphabetically
 * @param {Array} array
 * @param {String} key
 */
export const sortAlphabetically = (array, field) => {
  return array.sort((a, b) =>
    a[field].toLowerCase().localeCompare(b[field].toLowerCase())
  )
}
