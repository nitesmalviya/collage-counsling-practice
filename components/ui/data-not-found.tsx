"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { cn } from "@/lib/utils"

interface DataNotFoundProps {
  title?: string;
  description?: string;
  className?: string;
  actionSlot?: React.ReactNode;
  iconSlot?: React.ReactNode;
}

export default function DataNotFound({
  title = "No data found",
  description = "There is nothing to display here yet.",
  className,
  actionSlot,
  iconSlot,
}: DataNotFoundProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-0">
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              {iconSlot}
            </EmptyMedia>
            <EmptyTitle>{title}</EmptyTitle>
            <EmptyDescription>{description}</EmptyDescription>
          </EmptyHeader>
          {actionSlot ? <EmptyContent>{actionSlot}</EmptyContent> : null}
        </Empty>
      </CardContent>
    </Card>
  )
}


