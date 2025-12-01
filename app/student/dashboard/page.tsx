"use client"

import { StudentNav } from "@/components/navigation/student-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MessageSquare, Wallet, BookOpen, Clock, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { mockSessions, mockChatConversations, mockWalletTransactions } from "@/lib/mock-data"

export default function StudentDashboard() {
  const upcomingSessions = mockSessions.filter((s) => s.status === "upcoming" && s.studentId === "stu-1").slice(0, 2)

  const completedSessionsCount = mockSessions.filter((s) => s.status === "completed" && s.studentId === "stu-1").length

  const recentMessages = mockChatConversations.slice(0, 2).map((conv) => ({
    id: conv.id,
    from: conv.participantName,
    message: conv.lastMessage,
    time: conv.lastMessageTime,
  }))

  const tokenBalance = mockWalletTransactions.reduce((sum, txn) => sum + txn.tokens, 0)
  const unreadMessages = mockChatConversations.reduce((sum, conv) => sum + conv.unread, 0)

  return (
    <div className="min-h-screen bg-background">
      <StudentNav />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Emma!</h1>
            <p className="text-muted-foreground">Here's what's happening with your college journey</p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Token Balance</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tokenBalance}</div>
                <p className="text-xs text-muted-foreground">Available tokens</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingSessions.length}</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Sessions</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedSessionsCount}</div>
                <p className="text-xs text-muted-foreground">Total sessions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{unreadMessages}</div>
                <p className="text-xs text-muted-foreground">New messages</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Your scheduled counseling sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{session.title}</p>
                      <p className="text-sm text-muted-foreground">{session.educatorName}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(session.date).toLocaleDateString()} at {session.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {session.duration} min
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                ))}
                <Button className="w-full" asChild>
                  <Link href="/student/sessions">View All Sessions</Link>
                </Button>
              </CardContent>
            </Card>

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
    </div>
  )
}
