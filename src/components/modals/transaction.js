import { useTranslation } from "react-i18next"
import { RootModal } from "./"
import { TransactionForm } from "../../forms"
import { isEmpty } from "../../utils"

const TransactionModal = ({ show, data, onClose }) => {
  if (!show) return null
  const [t] = useTranslation()
  const editMode = !isEmpty(data)

  return (
    <RootModal onClose={onClose}>
      <div className="w-60">
        <RootModal.Title>
          {t(`transactions.${editMode ? "edit" : "add"}`)}
        </RootModal.Title>
        <TransactionForm data={data} isEdit={editMode} onClose={onClose} />
      </div>
    </RootModal>
  )
}

export default TransactionModal
