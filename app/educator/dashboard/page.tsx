"use client"

import { EducatorNav } from "@/components/navigation/educator-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MessageSquare, DollarSign, Users, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"
import { mockSessions, mockEducatorEarnings } from "@/lib/mock-data"

export default function EducatorDashboard() {
  const upcomingSessions = mockSessions.filter((s) => s.status === "upcoming" && s.educatorId === "edu-1").slice(0, 2)

  const totalEarnings = mockEducatorEarnings.filter((e) => e.status === "paid").reduce((sum, e) => sum + e.amount, 0)

  const activeStudents = new Set(mockSessions.filter((s) => s.educatorId === "edu-1").map((s) => s.studentId)).size
  const sessionsThisWeek = mockSessions.filter((s) => s.educatorId === "edu-1" && s.status === "upcoming").length

  return (
    <div className="min-h-screen bg-background">
      <EducatorNav />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Dr. Johnson!</h1>
            <p className="text-muted-foreground">Manage your sessions and help students succeed</p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalEarnings}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeStudents}</div>
                <p className="text-xs text-muted-foreground">Current students</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sessions This Week</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sessionsThisWeek}</div>
                <p className="text-xs text-muted-foreground">2 today</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.9</div>
                <p className="text-xs text-muted-foreground">Based on 156 reviews</p>
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
                      <p className="text-sm text-muted-foreground">{session.studentName}</p>
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
                  <Link href="/educator/sessions">View All Sessions</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Your Availability</CardTitle>
                <CardDescription>Manage your schedule and time slots</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Monday - Friday</p>
                      <p className="text-sm text-muted-foreground">9:00 AM - 5:00 PM</p>
                    </div>
                    <Button size="sm" variant="ghost">
                      Edit
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Saturday</p>
                      <p className="text-sm text-muted-foreground">10:00 AM - 2:00 PM</p>
                    </div>
                    <Button size="sm" variant="ghost">
                      Edit
                    </Button>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/educator/availability">Manage Availability</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/educator/sessions">
                    <Calendar className="w-6 h-6" />
                    View Schedule
                  </Link>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/educator/chat">
                    <MessageSquare className="w-6 h-6" />
                    Message Students
                  </Link>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/educator/availability">
                    <Clock className="w-6 h-6" />
                    Set Availability
                  </Link>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/educator/earnings">
                    <DollarSign className="w-6 h-6" />
                    View Earnings
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
