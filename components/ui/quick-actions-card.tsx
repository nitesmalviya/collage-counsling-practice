"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
// import { FormattedSession } from "@/utils/common-service"
import PageSubHeading from "./page-sub-heading"
import { Calendar, Clock, DollarSign, MessageSquare } from "lucide-react"

interface QuickActionsCardCardProps {

}

export function QuickActionsCard({
}: Readonly<QuickActionsCardCardProps>) {
  return (
    <Card>

      <PageSubHeading title={"Quick Actions"} description={"Common tasks and tools"} />
      <CardContent>
        <div className="grid gap-4 md:grid-cols-4">
          <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent" asChild>
            <Link href="/educator/sessions">
              <Calendar className="w-6 h-6" />
              View Schedule
            </Link>
          </Button>
          <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent" asChild>
            <Link href="/educator/chat">
              <MessageSquare className="w-6 h-6" />
              Message Students
            </Link>
          </Button>
          <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent" asChild>
            <Link href="/educator/availability">
              <Clock className="w-6 h-6" />
              Set Availability
            </Link>
          </Button>
          <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent" asChild>
            <Link href="/educator/earnings">
              <DollarSign className="w-6 h-6" />
              View Earnings
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

