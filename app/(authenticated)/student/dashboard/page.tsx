
import Dashboard from "@/components/student/dashboard"
import { StudentNav } from "@/components/navigation/student-nav"
import { getStudentDashboardAction } from "@/utils/graphql/dashboard/action"
import { cookies } from "next/headers"
import { STORAGE_KEYS } from "@/utils/constant"

const StudentDashboard = async () => {
  const cookieStore = await cookies();
  const user = cookieStore.get(STORAGE_KEYS.USER)?.value;
  const userId = JSON.parse(user || "{}")?.id;

  const res = getStudentDashboardAction({
    userId: userId || ""
  });

  const dashboardStudentData: StudentDashboardData = res?.getStudentDashboard || {
    completedSessions: 0,
    tokenBalance: 0,
    upcomingSessions: 0
  }

  return (
    <div className="min-h-screen bg-background">
      <StudentNav />
      <Dashboard dashboardStudentData={dashboardStudentData}/>
    </div>
  )
}

export default StudentDashboard;
