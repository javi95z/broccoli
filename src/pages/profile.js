import { useState } from "react"
import { useTranslation } from "react-i18next"
import { AppLayout } from "../components/layout"
import TabGroup from "../components/nav/tabs"
import { SectionTitle } from "../components/shared"
import { ProfileForm, SettingsForm } from "../forms"

const ProfilePage = () => {
  const [t] = useTranslation()
  const [activeItem, setActiveItem] = useState("Settings")

  const items = ["Settings", "Profile", "Notifications", "Other"]

  return (
    <AppLayout>
      <SectionTitle>{t("profile.title")}</SectionTitle>
      <TabGroup
        items={items}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      >
        <TabGroup.Tab isVisible={activeItem === "Settings"}>
          <div className="flex justify-center">
            <div className="w-1/2">
              <SettingsForm />
            </div>
          </div>
        </TabGroup.Tab>
        <TabGroup.Tab isVisible={activeItem === "Profile"}>
          <div className="flex justify-center">
            <div className="w-1/2">
              <ProfileForm />
            </div>
          </div>
        </TabGroup.Tab>
        <TabGroup.Tab isVisible={activeItem === "Notifications"}>
          <p>Notifications</p>
        </TabGroup.Tab>
      </TabGroup>
    </AppLayout>
  )
}

export default ProfilePage
