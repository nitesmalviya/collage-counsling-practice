"use client";

import { getUserDetails, parsedTokenAmount } from "@/utils/common-service";
import { getEducatorProfileAction } from "@/utils/graphql/sessions/action";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

const SessionDuration = () => {
  const userDetails = getUserDetails();

  const [sessionDuration, setSessionDuration] = useState<Record<string, number>>({});
  const fetchProfile = async () => {
    try {
      const res = await getEducatorProfileAction(userDetails?.id);
      debugger
      const parsedDurations = parsedTokenAmount(
        // res.GetEducatorProfile?.session_amount ?? "{30:50,60:100}"
        "{30:50,60:100}"
      );

      setSessionDuration(parsedDurations);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  console.log(sessionDuration, "session Duration");


  return (
    <div className="space-y-3">
      <label className="text-sm font-medium flex items-center gap-2">
        <Clock className="w-4 h-4" />
        Session Duration
      </label>

      <div className="grid grid-cols-2 gap-3">
        
        {Object.keys(sessionDuration)?.map((sd: string) => (
          <button
            key={sd}
            className={`p-4 rounded-lg border-2 transition-all text-left 
              border-border hover:border-primary/50
            `}
          >
            <div className="font-semibold">{sd} min</div>
            <div className="text-sm text-muted-foreground mt-1">
              {sessionDuration[sd]} tokens
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SessionDuration;
