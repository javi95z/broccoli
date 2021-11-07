import jwt from "jsonwebtoken"

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
