"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarX } from "lucide-react"
import PageHeader from "@/components/ui/page-header"
import SessionCards from "./session-cards"
import DataNotFound from "@/components/ui/data-not-found"
import { getSessionsAction } from "@/utils/graphql/sessions/action"

type SessionStatus = "upcoming" | "completed" | "cancelled" | "expired"

interface Session {
  id: string
}

interface SessionsProps {
  studentSessions: {
    completedCount: number
    canceledCount: number
    upcomingCount: number
    expiredCount: number
    sessions: Session[]
  }
}

const Sessions = ({ studentSessions }: SessionsProps) => {
  const [status, setStatus] = useState<SessionStatus>("upcoming")
  const [sessions, setSessions] = useState<Session[]>(studentSessions.sessions)
  const [isLoading, setIsLoading] = useState(false)

  const counts = {
    upcoming: studentSessions.upcomingCount,
    completed: studentSessions.completedCount,
    cancelled: studentSessions.canceledCount,
    expired: studentSessions.expiredCount,
  }

  useEffect(() => {
    let isMounted = true

    const fetchSessions = async () => {
      setIsLoading(true)
      try {
        const res = await getSessionsAction({
          input: {
            limit: 10,
            page: 1,
            name: "",
            filter: status.toUpperCase(),
          },
        })

        if (isMounted) {
          setSessions(res?.getSessions?.sessions ?? [])
        }
      } catch (err) {
        console.error("Failed to fetch sessions", err)
        if (isMounted) setSessions([])
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchSessions();

    return () => {
      isMounted = false
    }
  }, [status])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <PageHeader
            title="My Sessions"
            description="View and manage your counseling sessions"
          />
          <Button>Book New Session</Button>
        </div>

        <Tabs
          value={status}
          onValueChange={(v) => setStatus(v as SessionStatus)}
          className="space-y-6"
        >
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming ({counts.upcoming})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({counts.completed})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Canceled ({counts.cancelled})
            </TabsTrigger>
            <TabsTrigger value="expired">
              Expired ({counts.expired})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={status} className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary" />
              </div>
            ) : sessions.length > 0 ? (
              sessions.map((session) => (
                <SessionCards key={session.id} session={session} />
              ))
            ) : (
              <DataNotFound
                title={`No ${status} sessions found`}
                description={`You don't have any ${status} sessions at the moment.`}
                iconSlot={<CalendarX className="size-6" />}
                className="px-5"
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Sessions
