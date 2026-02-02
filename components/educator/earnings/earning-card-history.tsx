import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockEducatorEarnings } from '@/lib/mock-data';
 

const EarningCardHistory = ({earningsHistoryData}:any) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Earnings History</CardTitle>
                <CardDescription>Your session earnings and payouts</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {earningsHistoryData?.map((earning: any) => (
                        <div key={earning.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="space-y-1">
                                <p className="font-medium">Session with {earning.studentName}</p>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(earning.created_at).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                            <div className="text-right flex items-center gap-4">
                                <div>
                                    <p className="text-lg font-semibold">${earning.amount}</p>
                                    <Badge variant={earning.status === "paid" ? "default" : "secondary"}>{earning.transaction_type}</Badge>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default EarningCardHistory;
