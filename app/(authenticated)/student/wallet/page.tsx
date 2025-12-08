"use client"

import { StudentNav } from "@/components/navigation/student-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Plus, ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react"
import { mockWalletTransactions } from "@/lib/mock-data"

export default function StudentWallet() {
  const tokenBalance = mockWalletTransactions.reduce((sum, txn) => sum + txn.tokens, 0)
  const totalSpent = mockWalletTransactions
    .filter((t) => t.type === "spent")
    .reduce((sum, txn) => sum + Math.abs(txn.amount), 0)
  const totalPurchased = mockWalletTransactions
    .filter((t) => t.type === "purchase")
    .reduce((sum, txn) => sum + txn.amount, 0)

  return (
    <div className="min-h-screen bg-background">
      <StudentNav />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">My Wallet</h1>
            <p className="text-muted-foreground">Manage your tokens and transactions</p>
          </div>

          {/* Balance Card */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Current Balance</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-5xl font-bold">{tokenBalance}</p>
                    <p className="text-xl text-muted-foreground">tokens</p>
                  </div>
                  <p className="text-sm text-muted-foreground">≈ ${tokenBalance} USD (1 token = $1)</p>
                </div>
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wallet className="w-10 h-10 text-primary" />
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button size="lg" className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Tokens
                </Button>
                <Button size="lg" variant="outline">
                  Transfer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Purchased</CardTitle>
                <ArrowDownRight className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalPurchased}</div>
                <p className="text-xs text-muted-foreground">
                  {mockWalletTransactions.filter((t) => t.type === "purchase").length} transactions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalSpent}</div>
                <p className="text-xs text-muted-foreground">
                  {mockWalletTransactions.filter((t) => t.type === "spent").length} sessions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Refunds</CardTitle>
                <RefreshCw className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${mockWalletTransactions.filter((t) => t.type === "refund").reduce((sum, txn) => sum + txn.amount, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {mockWalletTransactions.filter((t) => t.type === "refund").length} refunds
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Your recent token activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockWalletTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === "purchase"
                            ? "bg-green-500/10"
                            : transaction.type === "refund"
                              ? "bg-blue-500/10"
                              : "bg-red-500/10"
                        }`}
                      >
                        {transaction.type === "purchase" ? (
                          <ArrowDownRight className="w-5 h-5 text-green-500" />
                        ) : transaction.type === "refund" ? (
                          <RefreshCw className="w-5 h-5 text-blue-500" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()} at {transaction.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-lg font-semibold ${
                          transaction.tokens > 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {transaction.tokens > 0 ? "+" : ""}
                        {transaction.tokens} tokens
                      </p>
                      <Badge variant="secondary">{transaction.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Token Packages */}
          <Card>
            <CardHeader>
              <CardTitle>Buy Token Packages</CardTitle>
              <CardDescription>Choose a package that fits your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-2">
                  <CardContent className="p-6 text-center space-y-4">
                    <div>
                      <p className="text-3xl font-bold">50</p>
                      <p className="text-sm text-muted-foreground">tokens</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">$50</p>
                      <p className="text-xs text-muted-foreground">$1.00 per token</p>
                    </div>
                    <Button className="w-full">Purchase</Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-primary">
                  <CardContent className="p-6 text-center space-y-4">
                    <Badge className="mb-2">Most Popular</Badge>
                    <div>
                      <p className="text-3xl font-bold">100</p>
                      <p className="text-sm text-muted-foreground">tokens</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">$95</p>
                      <p className="text-xs text-green-500">Save $5 (5% off)</p>
                    </div>
                    <Button className="w-full">Purchase</Button>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6 text-center space-y-4">
                    <Badge variant="secondary" className="mb-2">
                      Best Value
                    </Badge>
                    <div>
                      <p className="text-3xl font-bold">200</p>
                      <p className="text-sm text-muted-foreground">tokens</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">$180</p>
                      <p className="text-xs text-green-500">Save $20 (10% off)</p>
                    </div>
                    <Button className="w-full">Purchase</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
