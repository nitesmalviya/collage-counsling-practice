"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FormattedSession } from "@/utils/common-service"
import PageSubHeading from "./page-sub-heading"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"
import { Clock1 } from "lucide-react"

interface AvailabilityDay {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  fullday: boolean

}

interface AvailabilityCardCardProps {
  viewAllLink: string;
  availabilities: {
    GetEducatorAvailability: {
      availabilityDays: AvailabilityDay[];
    };
  };
}

function convertTo12Hour(time: string | null): string {
  if (!time) return "--";

  const [rawHour] = time.split(".");
  let hour = parseInt(rawHour);

  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour === 0 ? 12 : hour;

  return `${hour}:00 ${ampm}`;
}

export function AvailabilityCard({
  availabilities,
  viewAllLink,
}: Readonly<AvailabilityCardCardProps>) {


  const availabilityDaysDataList = availabilities.GetEducatorAvailability.availabilityDays;


  return (
    <Card>

      <PageSubHeading title={"Your Availability"} description={"Manage your schedule and time slots"} />
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {availabilityDaysDataList.length > 0 ? (
            availabilityDaysDataList.slice(0, 3).map((availabilityDayItem: AvailabilityDay) => (
              <div
                key={availabilityDayItem.dayOfWeek}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium capitalize">{availabilityDayItem?.dayOfWeek?.toLowerCase()}</p>
                  <p className="text-sm text-muted-foreground">
                    {convertTo12Hour(availabilityDayItem.startTime)} - {convertTo12Hour(availabilityDayItem.endTime)}
                  </p>
                </div>
                
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Clock1 className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No availability set</p>
            </div>
          )}
        </div>
        <Button className="w-full" asChild>
          <Link href={viewAllLink}>Manage Availability</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

