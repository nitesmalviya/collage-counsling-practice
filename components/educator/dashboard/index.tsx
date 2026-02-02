"use client"
import { Calendar, DollarSign, Users } from "lucide-react"
import DashboardCard from "@/components/ui/dashboard-card"
import { UpcomingSessionsCard } from "@/components/ui/upcoming-sessions-card"
import { AvailabilityCard } from "@/components/ui/availability-card"
import { QuickActionsCard } from "@/components/ui/quick-actions-card"
import PageHeader from "@/components/ui/page-header"
import { useAppSelector } from "@/store/hooks"

const EducatorDashboard = ({
  dashboardDataList,
  upcomingSessionsList,
  availabilityDataList
}: any) => {

  const user = useAppSelector(state => state.auth.user);

  const { activeStudents, sessionsThisWeek, totalEarnings } = dashboardDataList;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <PageHeader
            title={`Welcome back, ${user.first_name}  ${user?.last_name}`}
            description="Manage your sessions and help students succeed"
          />
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-3">
            <DashboardCard
              title="Total Earnings"
              value={totalEarnings}
              description={`+12% from last month`}
              icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            />
            <DashboardCard
              title="Active Students"
              value={activeStudents}
              description={`Current students`}
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
            />
            <DashboardCard
              title="Sessions This Week"
              value={sessionsThisWeek}
              description={`2 today`}
              icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Upcoming Sessions */}
            <UpcomingSessionsCard
              sessions={upcomingSessionsList}
              viewAllLink="/educator/sessions"
            />
            {/* Availability */}
            <AvailabilityCard
              availabilities={availabilityDataList}
              viewAllLink="/educator/availability" />
          </div>
          {/* Quick Actions */}
          <QuickActionsCard />
        </div>
      </div>
    </div>
  )
}


export default EducatorDashboard