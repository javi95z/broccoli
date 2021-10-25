import { useTranslation } from "react-i18next"
import { AppLayout } from "../components/layout"
import { SectionTitle } from "../components/shared"

const UserPage = () => {
  const [t] = useTranslation()

  return (
    <AppLayout>
      <SectionTitle>{t("profile.title")}</SectionTitle>
    </AppLayout>
  )
}

export default UserPage
