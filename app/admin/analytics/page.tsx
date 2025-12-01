"use client"

import { AdminNav } from "@/components/navigation/admin-nav"
import { Card } from "@/components/ui/card"

export default function AdminAnalytics() {
  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Platform metrics and insights</p>
        </Card>
      </div>
    </div>
  )
}
