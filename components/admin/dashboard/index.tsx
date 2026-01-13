"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign, Calendar, TrendingUp, Wallet } from "lucide-react"
import Link from "next/link"
import { mockAdminUsers, mockAdminPayments, mockAnalytics } from "@/lib/mock-data"
import PageHeader from "@/components/ui/page-header"
import DashboardCard from "@/components/ui/dashboard-card"
import { useAppSelector } from "@/store/hooks"

const AdminDashboard = ({ adminDashboardData }: any) => {
    console.log("Admin Dashboard Data in Component:", adminDashboardData);
    const user = useAppSelector(state => state.auth.user);
    const recentUsers = mockAdminUsers.slice(0, 3)
    const recentTransactions = mockAdminPayments.slice(0, 2);

    // Destructure admin Dashboard Data
    const { totalusers, revenue, growthRate, activeSessions } = adminDashboardData;
    const recentUsersList = adminDashboardData.users || [];
    console.log("Users List:", recentUsersList);

    return (

        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-8">
                    <PageHeader
                        title={`Admin Dashboard, ${user.first_name} ${user?.last_name}`}
                        description="MPlatform overview and management"
                    />

                    {/* Stats Grid */}
                    <div className="grid gap-4 md:grid-cols-4">
                        <DashboardCard
                            title="Total Users"
                            value={totalusers}
                            description={`+18% from last month`}
                            icon={<Users className="h-4 w-4 text-muted-foreground" />}
                        />
                        <DashboardCard
                            title="Revenue"
                            value={revenue}
                            description={`+18% from last month`}
                            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                        />

                        <DashboardCard
                            title="Active Sessions"
                            value={activeSessions}
                            description={`This month`}
                            icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
                        />
                        <DashboardCard
                            title="Growth Rate"
                            value={growthRate}
                            description={`User growth`}
                            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
                        />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid gap-6 md:grid-cols-1">
                        {/* Recent Users */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Users</CardTitle>
                                <CardDescription>Newly registered users</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {recentUsersList.slice(0,3).map((user:any) => (
                                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="space-y-1">
                                            <p className="font-medium">{`${user.first_name} ${user.last_name}`}</p>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Badge variant="secondary" className="capitalize">
                                                    {user.role}
                                                </Badge>
                                                <span>•</span>
                                                <span>{new Date(user.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="outline">
                                            View
                                        </Button>
                                    </div>
                                ))}
                                <Button className="w-full" asChild>
                                    <Link href="/admin/users">View All Users</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Recent Transactions */}
                        {/* <Card>
                            <CardHeader>
                                <CardTitle>Recent Transactions</CardTitle>
                                <CardDescription>Latest payment activity</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {recentTransactions.map((transaction) => (
                                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="space-y-1">
                                            <p className="font-medium">{transaction.userName}</p>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span>{transaction.type}</span>
                                                <span>•</span>
                                                <span>
                                                    {transaction.date} at {transaction.time}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">${transaction.amount}</p>
                                            <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                                                {transaction.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                                <Button className="w-full" asChild>
                                    <Link href="/admin/payments">View All Transactions</Link>
                                </Button>
                            </CardContent>
                        </Card> */}
                    </div>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Common administrative tasks</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-4">
                                <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent" asChild>
                                    <Link href="/admin/users">
                                        <Users className="w-6 h-6" />
                                        Manage Users
                                    </Link>
                                </Button>
                                <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent" asChild>
                                    <Link href="/admin/payments">
                                        <DollarSign className="w-6 h-6" />
                                        View Payments
                                    </Link>
                                </Button>
                                <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent" asChild>
                                    <Link href="/admin/analytics">
                                        <TrendingUp className="w-6 h-6" />
                                        Analytics
                                    </Link>
                                </Button>
                                <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent" asChild>
                                    <Link href="/admin/settings">
                                        <Calendar className="w-6 h-6" />
                                        Settings
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

export default AdminDashboard;