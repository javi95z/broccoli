import { useTranslation } from "react-i18next"
import { RootModal } from "./"
import { TransactionForm } from "../../forms"
import { isEmpty } from "../../utils"

/**
 * @param {Object} params
 * @param {Boolean} params.show
 * @param {Transaction} params.data
 * @param {Function} params.onClose
 * @returns {JSX.Element}
 */
const TransactionModal = ({ show, data, onClose }) => {
  if (!show) return null
  const [t] = useTranslation()
  const editMode = !isEmpty(data)

  return (
    <RootModal onClose={onClose}>
      <RootModal.Title>
        {t(`transactions.${editMode ? "edit" : "add"}`)}
      </RootModal.Title>
      <TransactionForm data={data} isEdit={editMode} onClose={onClose} />
    </RootModal>
  )
}

export default TransactionModal
