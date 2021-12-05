import { useTranslation } from "react-i18next"
import { AppLayout } from "../components/layout"
import { SectionTitle } from "../components/shared"

const ExplorePage = () => {
  const [t] = useTranslation()

  return (
    <AppLayout>
      <section>
        <SectionTitle>{t("explore.title")}</SectionTitle>
      </section>
    </AppLayout>
  )
}

export default ExplorePage
