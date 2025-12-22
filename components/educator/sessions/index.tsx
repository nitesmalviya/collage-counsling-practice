"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarX } from "lucide-react"
import { useEffect, useState } from "react"
import { getSessionsAction } from "@/utils/graphql/sessions/action";
import SessionCards from "./session-cards";
import DataNotFound from "@/components/ui/data-not-found"

const Sessions = ({ educatorSessions }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const sessions = educatorSessions || [];
    const completedCount = sessions?.completedCount || 0;
    const cencelCount = sessions?.canceledCount || 0;
    const upcomingCount = sessions?.upcomingCount || 0;
    const expiredCount = sessions?.expiredCount || 0;
    const allSessions = sessions.sessions || [];
    
    const [sessionData, setSessionData] = useState(allSessions)
    const [tabValue, setTabValue] = useState("upcoming")

    const handleTab = (value: string) => {
        setTabValue(value)
        sessionData([])
    }

    const fetchSessionData = async (tabValue: string) => {
        setIsLoading(true);
        try {
            return await getSessionsAction({
                "input": {
                    "limit": 10,
                    "name": "",
                    "page": 1,
                    "filter": tabValue?.toUpperCase()
                }
            });
        } catch (error) {
            console.log(error, "the repected api was failed");

        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        if (tabValue) {
            fetchSessionData(tabValue).then((res) => {
                const educatorSessionsList = res?.getSessions?.sessions || [];
                setSessionData(educatorSessionsList)
            })
        }
    }, [tabValue])

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">Session Management</h1>
                        <p className="text-muted-foreground">Manage your counseling sessions and schedule</p>
                    </div>

                    <Tabs defaultValue="upcoming" className="space-y-6">
                        <TabsList >
                            <TabsTrigger onClick={() => handleTab("upcoming")} value="upcoming">Upcoming ({upcomingCount})</TabsTrigger>
                            <TabsTrigger onClick={() => handleTab("completed")} value="completed">Completed ({completedCount})</TabsTrigger>
                            <TabsTrigger onClick={() => handleTab("cancelled")} value="cancelled">Cancelled ({cencelCount})</TabsTrigger>
                            <TabsTrigger onClick={() => handleTab("expired")} value="expired">Expired ({expiredCount})</TabsTrigger>
                        </TabsList>

                        <TabsContent value={tabValue} className="space-y-4">
                            {isLoading && (
                                <div className="flex items-center justify-center py-20">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-primary"></div>
                                </div>
                            )}
                            {sessionData.length > 0 && !isLoading ? (
                                sessionData.map((session: any) => (
                                    <SessionCards
                                        key={session.id}
                                        session={session} />
                                ))
                            ) : (
                                !isLoading && (
                                    <DataNotFound
                                        title={`No ${tabValue} sessions found`}
                                        description={`You don't have any ${tabValue} sessions at the moment.`}
                                        iconSlot={<CalendarX className="size-6" />}
                                        className="px-5"
                                    />
                                )
                            )}
                        </TabsContent>

                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Sessions;