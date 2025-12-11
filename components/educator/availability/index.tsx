"use client";

import { useEffect, useState } from "react";
import PageHeader from "../../ui/page-header";
import AvailabilitySettings from "./availability-settings";
import UnavailabilitySettings from "./unavailability-settings";
import { useToast } from "@/hooks/use-toast";
import { setAvailability } from "@/utils/graphql/availability/action";
import { DEFAULT_AVAILABILITY_FORM } from "@/utils/constant";
import { AvailabilityProps, SetAvailabilityInput } from "@/types/availability";



const Availability = ({ data }: AvailabilityProps) => {
  const { toast } = useToast();
  const [form, setForm] = useState<any>(data);

  useEffect(() => {
    setForm({
      ...form,
      availabilityDays:
        data?.availabilityDays.length > 0
          ? data?.availabilityDays
          : DEFAULT_AVAILABILITY_FORM.availabilityDays,
      break: {
        brak_between_interval:
          data?.break?.break_between_interval ??
          DEFAULT_AVAILABILITY_FORM.break.break_between_interval,
        interval_status:
          data?.break?.interval_status ??
          DEFAULT_AVAILABILITY_FORM.break.interval_status
      },
      lunchBreak: {
        startTime:
          data?.lunchBreak?.startTime ??
          DEFAULT_AVAILABILITY_FORM.lunchBreak.startTime,
        endTime:
          data?.lunchBreak?.endTime ??
          DEFAULT_AVAILABILITY_FORM.lunchBreak.endTime,
        lunchBreak:
          data?.lunchBreak?.lunchBreak ??
          DEFAULT_AVAILABILITY_FORM.lunchBreak.lunchBreak
      },
      overides: [],
      slot_duration:
        data?.slot_duration?.length > 0
          ? data?.slot_duration
          : DEFAULT_AVAILABILITY_FORM.slot_duration,

      unavailabilityDays:
        data?.unavailabilityDays?.length > 0
          ? data?.unavailabilityDays
          : DEFAULT_AVAILABILITY_FORM.unavailabilityDays
    });
  }, []);

  const saveAvailability = async (data: SetAvailabilityInput, isAvailability: boolean = false) => {
    try {
      let res = await setAvailability(data);
      debugger
      if (res.SetEducatorAvailability.success) {
        
        toast({
          title: isAvailability ? "Availability saved" : "Unavailability saved",
          description: isAvailability ? res.SetEducatorAvailability.message : "Unavailability set successfully"
        })
      } else {
        toast({
          title: "Error",
          description: isAvailability ? res.SetEducatorAvailability.message : "unable to set unavailability",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-2">
        <PageHeader
          title="Availability Management"
          description="Manage your educator availability and schedule"
        />
      </div>
      <div className="container mx-auto px-4 py-8 flex space-x-8">
        <AvailabilitySettings form={form} onSubmit={saveAvailability} />
        {/* Right Column - Unavailability & Breaks */}
        <div className="w-1/2">
          <UnavailabilitySettings form={form} onSubmit={saveAvailability} />
        </div>
      </div>
    </div>
  );
};

export default Availability;
