"use client"

import { AdminNav } from "@/components/navigation/admin-nav"
import { Card } from "@/components/ui/card"

export default function AdminSettings() {
  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Platform Settings</h2>
          <p className="text-muted-foreground">Configure platform settings</p>
        </Card>
      </div>
    </div>
  )
}
