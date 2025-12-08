// import moment from "moment";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";
// import { DayRowProps } from "@/types/availability";


function DayRow({ day, dayOfWeek }: DayRowProps) {

  return (
    <>
    <div className="grid grid-cols-[auto_1fr] items-center gap-3 py-2">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={true}
        /> Sunday
        <div className="w-24 text-sm font-medium">{dayOfWeek}</div>  {/* Display the day name directly */}
      </div>
       
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
          <div className="relative">
            <Input
              type="time"
              value="01:00 AM"
            />
            <Clock className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className="text-center text-sm text-muted-foreground">To</div>
          <div className="relative">
            <Input
              type="time"
              value="11:00 PM"

            />
            <Clock className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      
       
        
     
    </div>
    <div className="grid grid-cols-[auto_1fr] items-center gap-3 py-2">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={false}
        /> Monday
        <div className="w-24 text-sm font-medium">{dayOfWeek}</div>  {/* Display the day name directly */}
      </div>
       
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
          <div className="relative">
            <Input
              type="time"
              value="01:00 AM"
            />
            <Clock className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className="text-center text-sm text-muted-foreground">To</div>
          <div className="relative">
            <Input
              type="time"
              value="11:00 PM"

            />
            <Clock className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      
        <div className="h-10 w-full rounded-md border bg-muted text-muted-foreground flex items-center justify-center select-none">
          Unavailable
        </div>

        
     
    </div>
    <div className="grid grid-cols-[auto_1fr] items-center gap-3 py-2">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={true}
        /> Sunday
        <div className="w-24 text-sm font-medium">{dayOfWeek}</div>  {/* Display the day name directly */}
      </div>
       
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
          <div className="relative">
            <Input
              type="time"
              value="01:00 AM"
            />
            <Clock className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className="text-center text-sm text-muted-foreground">To</div>
          <div className="relative">
            <Input
              type="time"
              value="11:00 PM"

            />
            <Clock className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      
         

        
     
    </div>
    </>
  );
}

export default DayRow;
