"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import moment from "moment";
// import { GAP_OPTIONS } from "@/utils/constant";
// import { BreakSettingsProps } from "@/types/availability";
import { Clock } from "lucide-react";
const BreakSettings = ({
  enableLunchBreak,
  setEnableLunchBreak,
  lunchStart,
  setLunchStart,
  lunchEnd,
  setLunchEnd,
  enableGap,
  setEnableGap,
  gapMinutes,
  setGapMinutes,
}: BreakSettingsProps) => {

  return (
    <div className="space-y-4 mt-4">
      <div className="font-medium">Add your Break</div>
      <div className="flex items-center justify-between rounded-lg border p-3">
        <div>
          <div className="font-medium">
            Do you want to add lunch break?
          </div>
        </div>
        <Switch
          checked={enableLunchBreak}
          onCheckedChange={setEnableLunchBreak}
        />
      </div>
      {enableLunchBreak && (
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
      )}

      <div className="flex items-center justify-between rounded-lg border p-3">
        <div>
          <div className="font-medium">
            Do you want to add break between meetings?
          </div>
        </div>
        <Switch
          checked={enableGap}
          onCheckedChange={setEnableGap}
        />
      </div>

     
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 space-y-4">
          
            <Button
             
              className={"hover:bg-primary/5 hover:text-inherit"}
              type="button"
              variant="default"
           
            >
              5 Minutes
            </Button>
         
        </div>
     
    </div>
  );
};

export default BreakSettings;