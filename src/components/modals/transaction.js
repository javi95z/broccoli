import { useTranslation } from "react-i18next"
import { RootModal } from "./"
import { TransactionForm } from "../../forms"

const TransactionModal = ({ show, data, onClose }) => {
  if (!show) return null
  const [t] = useTranslation()

  return (
    <RootModal onClose={onClose}>
      <div className="w-60">
        <RootModal.Title>
          {t(`transactions.${data ? "edit" : "add"}`)}
        </RootModal.Title>
        <TransactionForm data={data} onClose={onClose} />
      </div>
    </RootModal>
  )
}

export default TransactionModal
