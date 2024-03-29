import jwt from "jsonwebtoken"

const OPERATION_TYPES = {
  BUY: "buy",
  SELL: "sell"
}

/**
 * Generate a new token for a given user id
 * @param {String} id User _id
 * @returns {String}
 */
export const generateNewToken = id => {
  return jwt.sign({ id }, process.env.jwtsecret, {
    expiresIn: "1d"
  })
}

/**
 * Get offset numbre for pagination
 * @param {Number} page
 * @param {Number} size
 * @returns {Number}
 */
export const getPaginationOffset = (page, size) =>
  page > 1 ? page * size - size : 0

/**
 * Remove empty values from an object
 * @param {Object} obj
 * @returns {Object}
 */
export const removeEmpty = obj => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null))
}

/**
 * Calculate balance difference
 * @param {Number} amount Amount of asset
 * @param {Number} oldValue Previous value
 * @param {Number} newValue Value now
 * @returns {Number}
 */
export const getBalanceDiff = (amount, oldValue, newValue) => {
  return amount * (newValue - oldValue)
}

/**
 * Calculate percentage difference
 * @param {Number} oldValue Previous value
 * @param {Number} newValue Value now
 * @returns {Number}
 */
export const getPercentageDiff = (oldValue, newValue) => {
  return ((newValue - oldValue) / oldValue) * 100
}

/**
 * Get percentage of a given value and total
 * @param {Number} value Number to calculate the percentage of total
 * @param {Number} total Total amount that represents 100%
 * @returns {Number}
 */
export const getPercentageOfTotal = (value, total) => {
  return (value * 100) / total || 0
}

/**
 * Get total value of an asset
 * @param {Number} amount Amount of held item
 * @param {Number} price Price of the item
 * @returns {Number}
 */
export const getTotalValue = (amount, price) => {
  return amount * price || 0
}

/**
 * Get average between two numbers
 * @param {*} num1 First number
 * @param {*} num2 Second number
 * @returns {Number}
 */
export const getAverage = (num1, num2) => {
  return (parseFloat(num1) + parseFloat(num2)) / 2
}

/**
 * Sort array data given a field
 * @param {Array} data Array to be sorted
 * @param {String} field Field to use
 * @param {String} order asc or desc
 * @returns {Array}
 */
export const sortData = (data, field, order = "asc") => {
  return data.sort((a, b) =>
    order === "desc" ? b[field] - a[field] : a[field] - b[field]
  )
}

/**
 * Get new amount value after a buy or sell operation
 * @param {"buy"|"sell"} operationType
 * @param {Number} previousAmount
 * @param {Number} amountToOperate
 * @returns
 */
export const getNewAmount = (
  operationType,
  previousAmount,
  amountToOperate
) => {
  const oldAmount = parseFloat(previousAmount)
  const newAmount = parseFloat(amountToOperate)
  return operationType === OPERATION_TYPES.SELL
    ? oldAmount - newAmount
    : oldAmount + newAmount
}

/**
 * Get inverted operation type
 * @param {"buy"|"sell"} type
 * @returns {"buy"|"sell"}
 */
export const getInvertedType = type => {
  if (type === OPERATION_TYPES.BUY) return OPERATION_TYPES.SELL
  if (type === OPERATION_TYPES.SELL) return OPERATION_TYPES.BUY
  return null
}
