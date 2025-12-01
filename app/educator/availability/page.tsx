"use client"

import { EducatorNav } from "@/components/navigation/educator-nav"
import { Card } from "@/components/ui/card"

export default function EducatorAvailability() {
  return (
    <div className="min-h-screen bg-background">
      <EducatorNav />
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Manage Availability</h2>
          <p className="text-muted-foreground">Set your available time slots</p>
        </Card>
      </div>
    </div>
  )
}
