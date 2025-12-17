"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MessageSquare, Wallet, BookOpen, Clock, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { mockSessions, mockChatConversations } from "@/lib/mock-data";
import { useAppSelector } from "@/store/hooks";
import PageHeader from "@/components/ui/page-header";
import { StudentDashboardData } from "@/types/dashboard"
import DashboardCard from "@/components/ui/dashboard-card"
import { UpcomingSessionsCard } from "@/components/ui/upcoming-sessions-card"
import { Session } from "@/types/sessions"

interface DashboardProps {
    dashboardStudentData: StudentDashboardData,
    upcomingSessionDataList: Session[]
}

const StudentDashboard = ({ dashboardStudentData, upcomingSessionDataList }: DashboardProps) => {
    const user = useAppSelector(state => state.auth.user);
    const { completedSessions, tokenBalance, upcomingSessions } = dashboardStudentData;

    const recentMessages = mockChatConversations.slice(0, 2).map((conv) => ({
        id: conv.id,
        from: conv.participantName,
        message: conv.lastMessage,
        time: conv.lastMessageTime,
    }));

    const unreadMessages = mockChatConversations.reduce((sum, conv) => sum + conv.unread, 0);

    console.log(upcomingSessionDataList, "upcomingSessionDataList");


    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-8">
                    <PageHeader
                        title={`Welcome back, ${user.first_name}  ${user?.last_name}`}
                        description="Manage your sessions and help students succeed"
                    />

                    {/* Stats Grid */}
                    <div className="grid gap-4 md:grid-cols-4">
                        <DashboardCard
                            title="Token Balance"
                            value={tokenBalance}
                            description={`+12% from last month`}
                            icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
                        />
                        <DashboardCard
                            title="Upcoming Sessions"
                            value={upcomingSessions}
                            description={`+12% from last month`}
                            icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
                        />
                        <DashboardCard
                            title="Completed Sessions"
                            value={completedSessions}
                            description={`+12% from last month`}
                            icon={<CheckCircle2 className="h-4 w-4 text-muted-foreground" />}
                        />
                        <DashboardCard
                            title="Unread Messages"
                            value={unreadMessages}
                            description={`+12% from last month`}
                            icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
                        />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Upcoming Sessions */}
                        <UpcomingSessionsCard 
                                sessions={upcomingSessionDataList}
                                viewAllLink="/student/sessions"/>

                        {/* Recent Messages */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Messages</CardTitle>
                                <CardDescription>Latest conversations with educators</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {recentMessages.map((msg) => (
                                    <div key={msg.id} className="flex items-start justify-between p-4 border rounded-lg">
                                        <div className="space-y-1">
                                            <p className="font-medium">{msg.from}</p>
                                            <p className="text-sm text-muted-foreground">{msg.message}</p>
                                            <p className="text-xs text-muted-foreground">{msg.time}</p>
                                        </div>
                                        <Button size="sm" variant="outline">
                                            Reply
                                        </Button>
                                    </div>
                                ))}
                                <Button className="w-full" asChild>
                                    <Link href="/student/chat">Open Chat</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Common tasks and resources</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-4">
                                <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent" asChild>
                                    <Link href="/student/sessions">
                                        <Calendar className="w-6 h-6" />
                                        Book Session
                                    </Link>
                                </Button>
                                <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent" asChild>
                                    <Link href="/student/chat">
                                        <MessageSquare className="w-6 h-6" />
                                        Send Message
                                    </Link>
                                </Button>
                                <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent" asChild>
                                    <Link href="/student/wallet">
                                        <Wallet className="w-6 h-6" />
                                        Add Tokens
                                    </Link>
                                </Button>
                                <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent" asChild>
                                    <Link href="/student/resources">
                                        <BookOpen className="w-6 h-6" />
                                        Browse Resources
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}



export default StudentDashboard;