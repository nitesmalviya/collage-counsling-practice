"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Video, User } from "lucide-react"

const Sessions = ({ educatorSessions }: any) => {


    const sessions = educatorSessions || [];

    const totalSessions = sessions?.total || 0;
    const completedCount = sessions?.completedCount || 0;
    const cencelCount = sessions?.canceledCount || 0;
    const upcomingCount = sessions?.upcomingCount || 0;
    const expiredCount = sessions?.expiredCount || 0;

    const allSessions = sessions.sessions || [];

    const upcomingSessions = allSessions.filter(
        (s: any) => s.status === "UPCOMING"
    );

    const completedSessions = allSessions.filter(
        (s: any) => s.status === "COMPLETED"
    );

    const cancelledSessions = allSessions.filter(
        (s: any) => s.status === "CANCELLED"
    );

    const expiredSessions = allSessions.filter(
        (s: any) => s.status === "EXPIRED"
    );

    console.log(allSessions, " allSessions Sessions educator Sessions");

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">Session Management</h1>
                        <p className="text-muted-foreground">Manage your counseling sessions and schedule</p>
                    </div>

                    <Tabs defaultValue="upcoming" className="space-y-6">
                        <TabsList>
                            <TabsTrigger value="upcoming">Upcoming ({upcomingCount})</TabsTrigger>
                            <TabsTrigger value="completed">Completed ({completedCount})</TabsTrigger>
                            <TabsTrigger value="cancelled">Cancelled ({cencelCount})</TabsTrigger>
                            <TabsTrigger value="expired">Expired ({expiredCount})</TabsTrigger>
                        </TabsList>

                        <TabsContent value="upcoming" className="space-y-4">
                            {
                                upcomingSessions.length > 0 ? (
                                    upcomingSessions.map((session: any) => (
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

                                                        <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                                                            <strong>Notes:</strong> {session.description}
                                                        </p>

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
                                    ))
                                ) : (
                                    <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
                                        <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg text-center">There are no upcoming sessions</p>
                                    </div>

                                )
                            }
                        </TabsContent>

                        <TabsContent value="completed" className="space-y-4">
                            {
                                completedSessions.length > 0 ? (
                                    completedSessions.map((session: any) => (
                                        <Card key={session.id}>
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between">
                                                    <div className="space-y-3 flex-1">
                                                        <div className="flex items-start justify-between">
                                                            <div>
                                                                <h3 className="text-xl font-semibold">{session.title}</h3>
                                                                <p className="text-muted-foreground flex items-center gap-2 mt-1">
                                                                    <User className="w-4 h-4" />
                                                                    {session?.educator?.first_name} {session?.educator?.last_name}
                                                                </p>
                                                            </div>
                                                            <Badge variant="secondary">{session.status}</Badge>
                                                        </div>
                                                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                                            <span className="flex items-center gap-2">
                                                                <Calendar className="w-4 h-4" />
                                                                {new Date(session.created_at).toLocaleDateString("en-US", {
                                                                    weekday: "long",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                })}
                                                            </span>
                                                            <span className="flex items-center gap-2">
                                                                <Clock className="w-4 h-4" />
                                                                {session.created_at} ({session.duration_min} min)
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                                                            <strong>Notes:</strong> {session.description}
                                                        </p>
                                                    </div>
                                                    {/* <div className="flex flex-col gap-2 ml-4">
                                                        <Button size="sm" variant="outline">
                                                            Add Notes
                                                        </Button>
                                                        <Button size="sm" variant="outline">
                                                            View Details
                                                        </Button>
                                                    </div> */}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">there are no completed session</p>
                                )
                            }
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Sessions;