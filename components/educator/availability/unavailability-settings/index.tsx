"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CalendarSelector from "./calendar-selector";
import { UnavailabilityDay, UnavailabilitySettingsProps } from "@/types/availability";
import { useRouter } from "next/navigation";

const UnavailabilitySettings = ({ form, onSubmit }: UnavailabilitySettingsProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState<UnavailabilityDay[]>(form?.unavailabilityDays);

  // Breaks and Lunch settings
  const [enableLunchBreak, setEnableLunchBreak] = useState<boolean>(form?.lunchBreak?.lunchBreak);
  const [lunchStart, setLunchStart] = useState<string>(form?.lunchBreak?.startTime);
  const [lunchEnd, setLunchEnd] = useState<string>(form?.lunchBreak?.endTime);
  const [enableGap, setEnableGap] = useState<boolean>(form?.break?.interval_status);
  const [gapMinutes, setGapMinutes] = useState<number>(form?.break?.break_between_interval);

  const saveUnavailability = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit({
      ...form,
      unavailabilityDays: unavailableDates,
      lunchBreak: { startTime: lunchStart, endTime: lunchEnd, lunchBreak: enableLunchBreak },
      break: {
        break_between_interval: gapMinutes, interval_status: enableGap
      }
    }
    );
    setIsSubmitting(false);
  };


  useEffect(() => {
    setUnavailableDates(form?.unavailabilityDays);
    setEnableLunchBreak(form?.lunchBreak?.lunchBreak);
    setLunchStart(form?.lunchBreak?.startTime);
    setLunchEnd(form?.lunchBreak?.endTime);
    setEnableGap(form?.break?.interval_status);
    setGapMinutes(form?.break?.break_between_interval);

  }, [form]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Mark Your Unavailability</CardTitle>
        <CardDescription>Block dates and add breaks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={saveUnavailability}>
          <div className="grid gap-6 md:grid-cols-2">
            <CalendarSelector
              unavailableDates={unavailableDates}
              setUnavailableDates={setUnavailableDates}
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button onClick={() => router.back()} type="button" className="hover:bg-primary/5 hover:text-inherit" variant="outline">
              Cancel
            </Button >
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Applying..." : "Apply"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UnavailabilitySettings;

