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

/**
 * @typedef {Object} PortfolioTotals
 * @property {Number} amount
 * @property {Number} balance
 * @property {Number} percentage
 *
 * @typedef {Object} PortfolioBreakdown
 * @property {Coin} coin
 * @property {Number} percentage
 *
 * @typedef {Object} Portfolio
 * @property {PortfolioTotals} totals
 * @property {PortfolioBreakdown[]} breakdown
 */

/**
 * @typedef {Object} SelectorHoldings
 * @property {Holding[]} data
 * @property {Boolean} loading
 */

/**
 * @typedef {Object} SelectorPortfolio
 * @property {Portfolio} data
 * @property {Boolean} loading
 */

/**
 * @typedef {Object} SelectorTransactions
 * @property {Transaction[]} data
 * @property {Boolean} loading
 */

/**
 * @typedef {Object} GetRequest
 * @property {Function} performRequest
 * @property {*} data
 * @property {Boolean} loading
 * @property {Boolean} error
 */

/**
 * @typedef {Object} PostRequest
 * @property {Function} performRequest
 * @property {Boolean} loading
 */
