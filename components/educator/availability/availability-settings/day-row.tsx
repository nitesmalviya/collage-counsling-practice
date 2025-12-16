import moment from "moment";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";
import { DayRowProps } from "@/types/availability";


const DayRow = ({ day, setDays, dayOfWeek }: DayRowProps) => {

  const onStartChange = (time: string) => {

    setDays((prev) => ({
      ...prev,
      [dayOfWeek]: {
        ...prev[dayOfWeek],
        startTime: time,
      },
    }));
  };

  const onEndChange = (time: string) => {
    setDays((prev) => ({
      ...prev,
      [dayOfWeek]: {
        ...prev[dayOfWeek],
        endTime: time,
      },
    }));
  };

  return (
    <>
      <div className="grid grid-cols-[auto_1fr] items-center gap-3 py-2">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={day?.fullDay}
            onCheckedChange={(v) => {
              setDays((prev) => ({
                ...prev,
                [dayOfWeek]: {
                  ...prev[dayOfWeek],
                  fullDay: Boolean(v),
                },
              }));
            }}
          />
          <div className="w-24 text-sm font-medium">{dayOfWeek}</div>  {/* Display the day name directly */}
        </div>
        {day?.fullDay ? (
          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
            <div className="relative">
              <Input
                type="time"
                value={moment(day?.startTime, "HH:mm").format("HH:mm")}
                onChange={(e) => onStartChange(moment(e.target.value, "HH:mm").format("HH.mm"))}
              />
              <Clock className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            <div className="text-center text-sm text-muted-foreground">To</div>
            <div className="relative">
              <Input
                type="time"
                value={moment(day?.endTime, "HH:mm").format("HH:mm")}
                onChange={(e) => onEndChange(moment(e.target.value, "HH:mm").format("HH.mm"))}
              />
              <Clock className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        ) : (
          <div className="h-10 w-full rounded-md border bg-muted text-muted-foreground flex items-center justify-center select-none">
            Unavailable
          </div>
        )}
      </div>
    </>
  );
}

export default DayRow;
