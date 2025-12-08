import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import DayRow from "./day-row";
import SessionDuration from "./session-duration";
// import { AvailabilityDay, AvailabilitySettingsProps } from "@/types/availability";


const AvailabilitySettings = ({ form  , onSubmit }: AvailabilitySettingsProps) => {

const [isSaving, setIsSaving] = useState(false);
  const initialDays = Array.isArray(form?.availabilityDays)
  ? form.availabilityDays.reduce((acc: Record<string, AvailabilityDay>, day: AvailabilityDay) => {
      acc[day.dayOfWeek] = day;
      return acc;
    }, {})
  : form?.availabilityDays;

const [days, setDays] = useState<Record<string, AvailabilityDay>>(initialDays);

  const saveAvailability = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await onSubmit({...form, availabilityDays: Object?.values(days)},true);

    setIsSaving(false);

  };

useEffect(() => {
  setDays(initialDays);
}, [form]);


  return (
    <div className="w-1/2 min-h-">
      <Card>
        <CardHeader>
          <CardTitle>Set Your Availability</CardTitle>
          <CardDescription>Define your working hours for each day</CardDescription>
        </CardHeader>
        <CardContent>
          <SessionDuration />
          <form onSubmit={saveAvailability} className="space-y-2">
            <div className="space-y-6 mt-5">
               
                <DayRow
                  
                />
            
            </div>
            <div className="flex items-center justify-end gap-3">
              {/* <Button className="hover:bg-primary/5 hover:text-inherit" type="button" variant="outline">Cancel</Button> */}
              <Button   disabled={isSaving} type="submit">{isSaving ? "Saving..." : "Save & Update"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvailabilitySettings;
