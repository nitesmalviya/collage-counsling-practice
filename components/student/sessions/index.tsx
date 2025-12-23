"use client"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarX } from "lucide-react"
import PageHeader from "@/components/ui/page-header"
import { useEffect, useState } from "react"
import SessionCards from "./session-cards"
import { getSessionsAction } from "@/utils/graphql/sessions/action"
import DataNotFound from "@/components/ui/data-not-found"

interface Session {
  id: string;
}

interface SessionsProps {
  sessions: never[]
  expiredCount: number
  upcomingCount: number
  completedCount: number
  canceledCount: number
  studentSessions: {
    completedCount: number;
    canceledCount: number;
    upcomingCount: number;
    expiredCount: number;
    sessions: Session[];
  };
}
const Sessions = ({ studentSessions }: { studentSessions: SessionsProps }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const sessions = studentSessions || [];
    const completedCount = sessions?.completedCount || 0;
    const canceledCount = sessions?.canceledCount || 0;
    const upcomingCount = sessions?.upcomingCount || 0;
    const expiredCount = sessions?.expiredCount || 0;
    const allSessions = sessions.sessions || [];
    const [sessionData, setSessionData] = useState(allSessions)
    const [tabValue, setTabValue] = useState("upcoming")

    const handleTab = (value: string) => {
        setTabValue(value)
        setSessionData([])
    }

    const fetchSessionData = async (tabValue: string) => {
        setIsLoading(true);
        try {
            const res = await getSessionsAction({
                "input": {"limit": 10,"name": "","page": 1,"filter": tabValue?.toUpperCase()
                }
            });
            return res;
        } catch (error) {
            console.log(error, "the repected api was failed");
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (tabValue) {
            fetchSessionData(tabValue).then((res) => {
                const studentSessionsList = res?.getSessions?.sessions || [];
                setSessionData(studentSessionsList)
            })
            
        }
    }, [tabValue]);


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <PageHeader
                        title={`My Sessions`}
                        description="View and manage your counseling sessions"
                    />
                    <Button>Book New Session</Button>
                </div>
                <Tabs value={tabValue} onValueChange={handleTab} className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="upcoming">Upcoming ({upcomingCount})</TabsTrigger>
                        <TabsTrigger value="completed">Completed ({completedCount})</TabsTrigger>
                        <TabsTrigger value="cancelled">Canceled ({canceledCount})</TabsTrigger>
                        <TabsTrigger value="expired">Expired ({expiredCount})</TabsTrigger>
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
    )
}

export default Sessions;