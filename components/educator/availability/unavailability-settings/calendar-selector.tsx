"use client";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useEffect, useMemo, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
// import moment from "moment";
// import { UnavailabilityDay } from "@/types/availability";
import { Clock } from "lucide-react";

interface CalendarSelectorProps {
  unavailableDates: UnavailabilityDay[];
  setUnavailableDates: (dates: UnavailabilityDay[]) => void;
}

const CalendarSelector = ({
  unavailableDates,
  setUnavailableDates,
}: CalendarSelectorProps) => {

  return (
    <>
      <div className="space-y-3">
        <div className="font-medium">Set your unavailability</div>
        <Calendar
          mode="single"
        
         
          modifiersClassNames={{
            apiUnavailable: "",
            apiUnavailableSelected: "",
          }}
          modifiersStyles={{
            apiUnavailable: {
              backgroundColor: "rgba(251, 191, 36, 0.55)",
              color: "#111827",
            },
            apiUnavailableSelected: {
              backgroundColor: "rgba(251, 191, 36, 0.55)",
              color: "#111827",
            },
          }}
          disabled={{ before: new Date() }}
          classNames={{ today: "" }}
          className="rounded-md border"
        />
      </div>
      <div className="space-y-4">
        <div className="font-medium">Set your unavailability</div>
        <div className="flex items-center justify-between rounded-lg border p-3">
          <div>
            <div className="font-medium">Blocks selected dates entirely</div>
          </div>
          {/* <Switch
            checked={currentEntry?.unavailableWholeDay ?? false}
            onCheckedChange={(checked) => {
              if (!selectedDate) return;
              upsertForDate(selectedDate, {
                unavailableWholeDay: checked,
                startTime: checked
                  ? undefined
                  : currentEntry?.startTime ??
                    `${formatYMD(selectedDate)}T09:00:00`,
                endTime: checked
                  ? undefined
                  : currentEntry?.endTime ??
                    `${formatYMD(selectedDate)}T17:00:00`,
              });
            }}
          /> */}
        </div>
         
          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 pl-3">
            <div className="space-y-1">
              <Label>Start Time</Label>
              <div className="relative">
                <Input
                  type="time"
                   
                   
                />
                <Clock className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground pt-6">
              -
            </div>
            <div className="space-y-1">
              <Label>End Time</Label>
              <div className="relative">
                <Input
                  type="time"
                   
                  
                />
                <Clock className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>
     
      </div>
    </>
  );
};

export default CalendarSelector;
