"use client"

import { EducatorNav } from "@/components/navigation/educator-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Video, User } from "lucide-react"
import { mockSessions } from "@/lib/mock-data"

export default function EducatorSessions() {
  const upcomingSessions = mockSessions.filter((s) => s.status === "upcoming" && s.educatorId === "edu-1")
  const completedSessions = mockSessions.filter((s) => s.status === "completed" && s.educatorId === "edu-1")

  return (
    <div className="min-h-screen bg-background">
      <EducatorNav />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Session Management</h1>
            <p className="text-muted-foreground">Manage your counseling sessions and schedule</p>
          </div>

          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming ({upcomingSessions.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedSessions.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingSessions.map((session) => (
                <Card key={session.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold">{session.title}</h3>
                            <p className="text-muted-foreground flex items-center gap-2 mt-1">
                              <User className="w-4 h-4" />
                              {session.studentName}
                            </p>
                          </div>
                          <Badge>{session.type}</Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(session.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {session.time} ({session.duration} min)
                          </span>
                        </div>
                        {session.notes && (
                          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                            <strong>Notes:</strong> {session.notes}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button size="sm">
                          <Video className="w-4 h-4 mr-2" />
                          Start Session
                        </Button>
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                        <Button size="sm" variant="ghost">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedSessions.map((session) => (
                <Card key={session.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold">{session.title}</h3>
                            <p className="text-muted-foreground flex items-center gap-2 mt-1">
                              <User className="w-4 h-4" />
                              {session.studentName}
                            </p>
                          </div>
                          <Badge variant="secondary">{session.type}</Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(session.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {session.time} ({session.duration} min)
                          </span>
                        </div>
                        {session.notes && (
                          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{session.notes}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button size="sm" variant="outline">
                          Add Notes
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
