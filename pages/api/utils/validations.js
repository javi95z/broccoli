import i18n from "i18next"

/**
 * Validate a transaction
 * @param {Transaction} data
 * @returns {Boolean}
 */
export const validateTransaction = data => {
  // Check transaction date is past
  const today = new Date().toISOString().slice(0, 10)
  const isFutureDate = data.date > today
  if (isFutureDate) throw new Error(i18n.t("transactions.message.dateFuture"))

  return true
}
