
import Dashboard from "@/components/admin/dashboard"
import { getAdminDashboardAction } from "@/utils/graphql/dashboard/action";


const AdminDashboard = async () => {

  const res = await getAdminDashboardAction({});

  const adminDashboardData = res?.getAdminDashboard || {};

  console.log("Admin Dashboard Data:", adminDashboardData);

  return (
    <Dashboard adminDashboardData={adminDashboardData} />
  )
}


export default AdminDashboard;
