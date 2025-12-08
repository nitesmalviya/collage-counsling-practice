"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"
// import { FormattedSession } from "@/utils/common-service"
import PageSubHeading from "./page-sub-heading"

interface UpcomingSessionsCardProps {
  sessions: FormattedSession[]
  viewAllLink: string
  noDataMessage?: string
}

export function UpcomingSessionsCard({
  sessions,
  viewAllLink,
  noDataMessage = "No upcoming sessions"
}: Readonly<UpcomingSessionsCardProps>) {


  return (
    <Card>
      <PageSubHeading title={"Upcoming Sessions"} description={"Your scheduled counseling sessions"} />
      <CardContent className="space-y-4">
        {sessions.length > 0 ? (
          sessions.slice(0, 3).map((session) => (
            <div key={session.id} className="flex items-start justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <p className="font-medium">{session.title}</p>
                <p className="text-sm text-muted-foreground">{session.educator?.first_name}{session.educator?.last_name}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {session.created_at} at {session.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {session.duration_min} min
                  </span>
                </div>
              </div>
              {/* <Button size="sm" variant="outline">
                      View
                    </Button> */}
            </div>
          ))
        ) :
          (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>{noDataMessage}</p>
            </div>
          )}
        <Button className="w-full" asChild>
          <Link href={viewAllLink}>View All Sessions</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

