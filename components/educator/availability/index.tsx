"use client";

import { useEffect, useState } from "react";
import PageHeader from "../../ui/page-header";
import AvailabilitySettings from "./availability-settings";
import UnavailabilitySettings from "./unavailability-settings";
import { useToast } from "@/hooks/use-toast";
// import { setAvailability } from "@/utils/graphql/availability/action";
// import { DEFAULT_AVAILABILITY_FORM } from "@/utils/constant";
// import { AvailabilityProps, SetAvailabilityInput } from "@/types/availability";



const Availability = ({ data }: AvailabilityProps) => {
  const { toast } = useToast();
  const [form, setForm] = useState<any>(data);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-2">
        <PageHeader
          title="Availability Management"
          description="Manage your educator availability and schedule"
        />
      </div>
      <div className="container mx-auto px-4 py-8 flex space-x-8">
        <AvailabilitySettings />

        {/* Right Column - Unavailability & Breaks */}
        <div className="w-1/2">
          <UnavailabilitySettings />
        </div>
      </div>
    </div>
  );
};

export default Availability;
