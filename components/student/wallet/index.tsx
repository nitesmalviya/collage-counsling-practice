
"use client"

import { Plus, ArrowUpRight, ArrowDownRight, RefreshCw, Wallet } from "lucide-react"
import { mockWalletTransactions } from "@/lib/mock-data"
import PageHeader from "@/components/ui/page-header"
import DashboardCard from "@/components/ui/dashboard-card"
import { mapWalletTransactions } from "@/utils/server-common"
import TransactionsHistory from "./transactions-history"
import { useAppSelector } from "@/store/hooks"
import { getUpdatedTokenAction } from "@/utils/graphql/auth/action"
import { useEffect, useState } from "react"
import BalanceCard from "./balance-card"

interface WalletProps {
    purchaseCount: number;
    refundCount: number;
    sessionsCount: number;
    totalPurchased: number;
    totalRefunded: number;
    totalSpent: number;
    transactionHistory: {
        total: number;
        transactions: {
            id: string;
            type: "purchase" | "refund" | "spent";
            description: string;
            date: string;
            time: string;
            tokens: number;
            status: string;
        }[];
    };
    walletSummary: {
        purchaseCount: number;
        refundCount: number;
        sessionsCount: number;
        totalPurchased: number;
        totalRefunded: number;
        totalSpent: number;
    };
}

const StudentWallet = ({ walletSummary, transactionHistory }: WalletProps) => {
    const [resToken, setResToken] = useState(0);
    const tokenBalance = mockWalletTransactions.reduce((sum, txn) => sum + txn.tokens, 0)

    console.log(walletSummary);

    const totalPurchased = walletSummary.totalPurchased;
    const totalSpent = walletSummary.totalSpent;
    const totalRefunds = walletSummary.totalRefunded;


    const transactions = mapWalletTransactions(transactionHistory.transactions);
    const totalTransactions = transactionHistory.total;


    const fetchUpdatedTokenBalance = async () => {
        try {
            const tokenRes = await getUpdatedTokenAction();
            if (typeof tokenRes === "number") {
                setResToken(tokenRes);
            }
        } catch (error) {
            console.log(error, "Error");
        }
    }

    useEffect(() => {
        fetchUpdatedTokenBalance();
    }, [])


    console.log(resToken, "tokenRestokenRes")


    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-6">

                    <PageHeader
                        title="My Wallet"
                        description="Manage your tokens and transactions"
                    />

                    {/* Balance Card */}
                    <BalanceCard resToken={resToken} />

                    {/* Stats Grid */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <DashboardCard
                            title="Total Purchased"
                            value={`${totalPurchased} tokens`}
                            description={`${mockWalletTransactions.filter((t) => t.type === "purchase").length} transactions`}
                            icon={<ArrowDownRight className="h-4 w-4 text-green-500" />}
                        />
                        <DashboardCard
                            title="Total Spent"
                            value={`${totalSpent} tokens`}
                            description={`${mockWalletTransactions.filter((t) => t.type === "spent").length} sessions`}
                            icon={<ArrowUpRight className="h-4 w-4 text-red-500" />}
                        />
                        <DashboardCard
                            title="Refunds"
                            value={`${totalRefunds} tokens`}
                            description={`${mockWalletTransactions.filter((t) => t.type === "refund").length} refunds`}
                            icon={<RefreshCw className="h-4 w-4 text-blue-500" />}
                        />
                    </div>

                    {/* Transaction History */}
                    <TransactionsHistory transactions={transactions} />
                </div>
            </div>
        </>
    )
}




export default StudentWallet