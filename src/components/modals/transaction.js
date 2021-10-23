import { useTranslation } from "react-i18next"
import { RootModal } from "./"
import { TransactionForm } from "../../forms"

const TransactionModal = ({ show, onClose }) => {
  if (!show) return null
  const [t] = useTranslation()

  return (
    <RootModal onClose={onClose}>
      <div className="w-60">
        <h2 className="text-2xl tracking-tight font-thin mb-5">
          {t("transactions.add")}
        </h2>
        <TransactionForm onClose={onClose} />
      </div>
    </RootModal>
  )
}

export default TransactionModal
