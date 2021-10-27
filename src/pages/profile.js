import { useState } from "react"
import { useTranslation } from "react-i18next"
import { AppLayout } from "../components/layout"
import TabGroup from "../components/nav/tabs"
import { SectionTitle } from "../components/shared"
import { ProfileForm, SettingsForm } from "../forms"

const ProfilePage = () => {
  const [t] = useTranslation()
  const [activeItem, setActiveItem] = useState("settings")

  const items = ["settings", "profile", "notifications", "other"]

  return (
    <AppLayout>
      <SectionTitle>{t("profile.title")}</SectionTitle>
      <TabGroup
        items={items}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      >
        <TabGroup.Tab isVisible={activeItem === "settings"}>
          <div className="flex justify-center">
            <div className="w-1/2">
              <SettingsForm />
            </div>
          </div>
        </TabGroup.Tab>
        <TabGroup.Tab isVisible={activeItem === "profile"}>
          <div className="flex justify-center">
            <div className="w-1/2">
              <ProfileForm />
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

export default ProfilePage
