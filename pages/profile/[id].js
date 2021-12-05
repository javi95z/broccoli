import { useState } from "react"
import { useTranslation } from "react-i18next"
import { AppLayout } from "../../components/layout"
import { TabGroup } from "../../components/nav"
import { SectionTitle } from "../../components/shared"
import { ProfileForm, SettingsForm } from "../../forms"

const ProfileSettingsPage = ({ id }) => {
  const [t] = useTranslation()
  const [activeItem, setActiveItem] = useState(id)

  const items = ["edit", "settings", "notifications"]

  return (
    <AppLayout>
      <SectionTitle>{t("profile.title")}</SectionTitle>
      <TabGroup
        items={items}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      >
        <TabGroup.Tab isVisible={activeItem === "edit"}>
          <div className="flex justify-center">
            <div className="w-full md:w-1/2">
              <ProfileForm />
            </div>
          </div>
        </TabGroup.Tab>
        <TabGroup.Tab isVisible={activeItem === "settings"}>
          <div className="flex justify-center">
            <div className="w-full md:w-1/2">
              <SettingsForm />
            </div>
          </div>
        </TabGroup.Tab>
        <TabGroup.Tab isVisible={activeItem === "notifications"}>
          <p>Notifications</p>
        </TabGroup.Tab>
      </TabGroup>
    </AppLayout>
  )
}

export const getServerSideProps = async ({ params }) => {
  return {
    props: params
  }
}

export default ProfileSettingsPage
