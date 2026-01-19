"use client"

import { Card } from "@/components/ui/card";
import UserOverviewChart from "./user-overview-chart";
import { AnalyticsResponse } from "@/lib/types";
import SessionStatusChart from "./session-chart";
import PageHeader from "@/components/ui/page-header";

interface AnalyticsProps {
    analyticsData: AnalyticsResponse;

}

const Analytics = ({ analyticsData }: AnalyticsProps) => {

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-10">
                    <PageHeader
                        title="Analytics Dashboard"
                        description="Platform metrics and insights"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="p-8">
                        <h2 className="text-2xl font-bold mb-2">Analytics Dashboard</h2>
                        <UserOverviewChart analyticsData={analyticsData?.getAnalytics?.userOverview || {}} />
                    </Card>
                    <Card className="p-6">
                        <h3 className="text-lg font-bold mb-4">Session OverView</h3>
                        <SessionStatusChart userData={analyticsData?.getAnalytics?.sessionStatus || {}} />
                    </Card>
                </div>

            </div>
        </div>
    )
}


export default Analytics;