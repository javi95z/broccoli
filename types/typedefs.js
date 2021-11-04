/**
 * @typedef {Object} Transaction
 * @property {String} _id
 * @property {String} owner
 * @property {Number} amount
 * @property {String} type
 * @property {Coin} coin
 * @property {Date} date
 * @property {Number} price
 * @property {Number} balanceDiff
 * @property {Number} percentageDiff
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} Coin
 * @property {String} _id
 * @property {String} id
 * @property {String} name
 * @property {String} image
 * @property {String} symbol
 * @property {Number} price
 */

/**
 * @typedef {Object} Holding
 * @property {String} _id
 * @property {Coin} coin
 * @property {String} owner
 * @property {Number} amount
 * @property {Number} totalValue
 * @property {Number} averagePrice
 * @property {Number} balanceDiff
 * @property {Number} percentageDiff
 */
