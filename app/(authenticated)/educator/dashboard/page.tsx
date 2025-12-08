import Dashboard from "@/components/educator/dashboard";
import { EducatorDashboardData } from "@/types/dashboard";
import { STORAGE_KEYS } from "@/utils/constant";
import { getEducatorAvailabilityAction } from "@/utils/graphql/availability/action";
import { getEducatorDashboardAction } from "@/utils/graphql/dashboard/action";
import { getSessionsAction } from "@/utils/graphql/sessions/action";
import { cookies } from "next/headers";

const EducatorDashboard = async () => {
  const cookieStore = await cookies();
  const user = cookieStore.get(STORAGE_KEYS.USER)?.value;
  const userId = JSON.parse(user || "{}")?.id;

  const res = await getEducatorDashboardAction({
    userId: userId || ""
  });

  // Dashboard data list here
  const dashboardDataList: EducatorDashboardData = res?.getEducatorDashboard || {
    activeStudents: 0,
    sessionsThisWeek: 0,
    totalEarnings: 0
  }
  // Session Data list here
  const sessionsDataList = await getSessionsAction({});
  const upcomingSessionsList = sessionsDataList?.getSessions?.sessions || [];
  // Availability data list here
  const availabilityDataList = await getEducatorAvailabilityAction({});

  return (
    <div className="min-h-screen bg-background">
      <Dashboard
        dashboardDataList={dashboardDataList}
        upcomingSessionsList={upcomingSessionsList}
        availabilityDataList={availabilityDataList}
      />

    </div>
  )
}


export default EducatorDashboard;