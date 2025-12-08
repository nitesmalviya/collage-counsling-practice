"use client"

import { StudentNav } from "@/components/navigation/student-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Video, User } from "lucide-react"
import { mockSessions, mockEducators } from "@/lib/mock-data"

export default function StudentSessions() {
  const upcomingSessions = mockSessions.filter((s) => s.status === "upcoming" && s.studentId === "stu-1")
  const completedSessions = mockSessions.filter((s) => s.status === "completed" && s.studentId === "stu-1")

  return (
    <div className="min-h-screen bg-background">
      <StudentNav />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Sessions</h1>
              <p className="text-muted-foreground">View and manage your counseling sessions</p>
            </div>
            <Button>Book New Session</Button>
          </div>

          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming ({upcomingSessions.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedSessions.length})</TabsTrigger>
              <TabsTrigger value="educators">Find Educators</TabsTrigger>
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
                              {session.educatorName}
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
                          Join Session
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
                              {session.educatorName}
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
                          View Notes
                        </Button>
                        <Button size="sm" variant="outline">
                          Book Again
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="educators" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                {mockEducators.map((educator) => (
                  <Card key={educator.id}>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <img
                          src={educator.avatar || "/placeholder.svg"}
                          alt={educator.name}
                          className="w-16 h-16 rounded-full"
                        />
                        <div className="flex-1">
                          <CardTitle>{educator.name}</CardTitle>
                          <CardDescription>{educator.title}</CardDescription>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary">{educator.specialty}</Badge>
                            <span className="text-sm text-muted-foreground">
                              ⭐ {educator.rating} ({educator.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{educator.bio}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">${educator.hourlyRate}/hour</span>
                        <Button>Book Session</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
