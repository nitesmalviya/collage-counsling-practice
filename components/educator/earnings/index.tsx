"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, Calendar, Download, Ear } from "lucide-react"
import { mockEducatorEarnings } from "@/lib/mock-data"
import { EarningHistoryItem, EducatorTotalEarnings } from "@/types/earning"
import DashboardCard from "@/components/ui/dashboard-card"
import EarningCardHistory from "./earning-card-history"


interface EarningsProps {
    totalEarningsData: EducatorTotalEarnings;
    earningsHistoryData?: EarningHistoryItem;
    items?: any;
}

const Earnings = ({ totalEarningsData, earningsHistoryData }: EarningsProps) => {
    const { totalEarnings, paidOut, pending, nextPayout } = totalEarningsData;

    console.log(earningsHistoryData, "Earnings History");

      

 

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Earnings Dashboard</h1>
                            <p className="text-muted-foreground">Track your earnings and payouts</p>
                        </div>
                        <Button>
                            <Download className="w-4 h-4 mr-2" />
                            Export Report
                        </Button>
                    </div>

                    {/* Earnings Overview */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <DashboardCard
                            title="Total Earnings"
                            value={`$${totalEarnings}`}
                            description={`All time`}
                            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
                        />
                        <DashboardCard
                            title="Paid Out"
                            value={`$${paidOut}`}
                            description={`sessions`}
                            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                        />
                        <DashboardCard
                            title="Pending"
                            value={`$${pending}`}
                            description={`sessions`}
                            icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
                        />
                    </div>

                    {/* Earnings History */}
                    <EarningCardHistory earningsHistoryData={earningsHistoryData} />

                    {/* Payout Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Payout Information</CardTitle>
                            <CardDescription>How and when you get paid</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-muted rounded-lg space-y-2">
                                <p className="font-medium">Next Payout</p>
                                <p className="text-2xl font-bold">${nextPayout}</p>
                                <p className="text-sm text-muted-foreground">Scheduled for end of month</p>
                            </div>
                            <div className="space-y-2 text-sm">
                                <p className="text-muted-foreground">
                                    <strong>Payment Method:</strong> Bank Transfer
                                </p>
                                <p className="text-muted-foreground">
                                    <strong>Account:</strong> ****1234
                                </p>
                                <Button variant="outline" size="sm">
                                    Update Payment Method
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Earnings;
