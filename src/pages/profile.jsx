import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
// import { Link } from "react-router-dom"
import { PencilIcon } from "../components/icons"
import { AppLayout } from "../../components/layout"
import { Button, SectionTitle } from "../components/shared"
import settings from "../settings.json"

const ProfilePage = () => {
  const [t] = useTranslation()
  const { user } = useSelector(state => state.auth)

  return (
    <AppLayout>
      <SectionTitle>{t("profile.title")}</SectionTitle>
      <section className="flex flex-col gap-2">
        <div className="flex justify-end">
          {/* <Link to={settings.ROUTES.USER_SETTINGS.EDIT}> */}
            <Button color="secondary">
              <PencilIcon width={18} />
              <span className="ml-2">Edit profile</span>
            </Button>
          {/* </Link> */}
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-2 w-2/3">
            {user.avatar && (
              <img src={user.avatar} className="object-contain" />
            )}
            <span className="text-3xl font-thin">{user.fullname}</span>
            <span>{user.email}</span>
          </div>
        </div>
      </section>
    </AppLayout>
  )
}

export default ProfilePage
