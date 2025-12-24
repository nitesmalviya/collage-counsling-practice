import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownRight, ArrowUpRight, RefreshCw } from "lucide-react";

export interface Transaction {
  id: string
  type: "purchase" | "spent" | "refund"
  description: string
  date: string
  time: string
  tokens: number
  amount: number
  status: string
}

const TransactionsHistory = ({ transactions }: { transactions: Transaction[] }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Your recent token activity</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {transactions.map((transactionItem) => (
                        <div key={transactionItem.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${transactionItem.type === "purchase"
                                        ? "bg-green-500/10"
                                        : transactionItem.type === "refund"
                                            ? "bg-blue-500/10"
                                            : "bg-red-500/10"
                                        }`}
                                >
                                    {transactionItem.type === "purchase" ? (
                                        <ArrowDownRight className="w-5 h-5 text-green-500" />
                                    ) : transactionItem.type === "refund" ? (
                                        <RefreshCw className="w-5 h-5 text-blue-500" />
                                    ) : (
                                        <ArrowUpRight className="w-5 h-5 text-red-500" />
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium">{transactionItem?.description}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {transactionItem?.date} at {transactionItem?.time}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p
                                    className={`text-lg font-semibold ${transactionItem?.tokens > 0 ? "text-green-500" : "text-red-500"
                                        }`}
                                >
                                    {transactionItem?.tokens > 0 ? "+" : ""}
                                    {transactionItem?.tokens} tokens
                                </p>
                                <Badge variant="secondary">{transactionItem?.status}</Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}


export default TransactionsHistory;