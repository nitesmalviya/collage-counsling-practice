import Setting from "@/components/admin/setting";
import { getAdminSettings } from "@/utils/graphql/setting/action";


const AdminSettings = async () => {
  const res = await getAdminSettings();
  const settingsData = res?.getSettings?.settings || {};

  return (
    <Setting settingsData={settingsData} />
  )
}

export default AdminSettings;
