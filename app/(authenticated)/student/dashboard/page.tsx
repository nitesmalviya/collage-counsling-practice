
import Dashboard from "@/components/student/dashboard"
import { StudentNav } from "@/components/navigation/student-nav"
import { getStudentDashboardAction } from "@/utils/graphql/dashboard/action"
import { cookies } from "next/headers"
import { STORAGE_KEYS } from "@/utils/constant"
import { getSessionsAction } from "@/utils/graphql/sessions/action"
import { StudentDashboardData } from "@/types/dashboard"

const StudentDashboard = async () => {
  const cookieStore = await cookies();
  const user = cookieStore.get(STORAGE_KEYS.USER)?.value;
  const userId = JSON.parse(user || "{}")?.id;

  const res = await getStudentDashboardAction({
    userId: userId || ""
  });
  
  const dashboardStudentData: StudentDashboardData = res?.getStudentDashboard || {
    completedSessions: 0,
    tokenBalance: 0,
    upcomingSessions: 0
  }

  const sessionsDataList = await getSessionsAction({});
  const upcomingSessionDataList = sessionsDataList?.getSessions?.sessions || [];

  return (
    <div className="min-h-screen bg-background">
      <StudentNav />
      <Dashboard 
                dashboardStudentData={dashboardStudentData} 
                upcomingSessionDataList={upcomingSessionDataList}
      />
    </div>
  )
}

export default StudentDashboard;
