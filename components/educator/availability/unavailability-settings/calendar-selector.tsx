"use client";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useEffect, useMemo, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import moment from "moment";
import { UnavailabilityDay } from "@/types/availability";
import { Clock } from "lucide-react";

interface CalendarSelectorProps {
  unavailableDates: UnavailabilityDay[];
  setUnavailableDates: (dates: UnavailabilityDay[]) => void;
}

const CalendarSelector = ({
  unavailableDates,
  setUnavailableDates,
}: CalendarSelectorProps) => {
  // Track initial API dates to color them differently than user-added dates
  const initialApiDatesRef = useRef<Set<string>>(new Set());

  // Normalize incoming data to an array to avoid runtime errors when a single object is passed
  const entries = useMemo<UnavailabilityDay[]>(() => {
    if (Array.isArray(unavailableDates)) return unavailableDates;
    if (unavailableDates)
      return [unavailableDates as unknown as UnavailabilityDay];
    return [];
  }, [unavailableDates]);

  useEffect(() => {
    if (initialApiDatesRef.current.size === 0 && entries.length > 0) {
      const keys = entries
        .map((d) => d.unavailable_date_at)
        .filter((v): v is string => Boolean(v));
      initialApiDatesRef.current = new Set(keys);
    }
  }, [entries]);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const parseYMDToLocalDate = (ymd: string) => {
    const [y, m, d] = ymd.split("-").map((n) => parseInt(n, 10));
    return new Date(y, (m || 1) - 1, d || 1);
  };

  const formatYMD = (date: Date) => moment(date).format("YYYY-MM-DD");
  const getDayOfWeek = (date: Date) =>
    moment(date).format("dddd").toUpperCase();

  // Initialize selected date from first entry
  useEffect(() => {
    if (!selectedDate && entries && entries.length > 0) {
      const first = entries[0]?.unavailable_date_at;
      if (first) setSelectedDate(parseYMDToLocalDate(first));
    }
  }, [selectedDate, entries]);

  // Convert ISO datetime (2025-11-10T11:00:00) to HH:mm format for UI
  const toUI = (value: string | undefined) => {
    if (!value) return "";
    // Handle ISO format (2025-11-10T11:00:00)
    if (value.includes("T")) {
      return moment(value).format("HH:mm");
    }
    // Handle old HH.mm format just in case
    const normalized = value.replace(".", ":");
    return moment(normalized, "HH:mm").format("HH:mm");
  };

  // Convert HH:mm format to ISO datetime (2025-11-10T11:00:00) using the selected date
  const toAPI = (colonTime: string | undefined, date: Date) => {
    if (!colonTime) return undefined;
    const dateString = formatYMD(date);
    const hhmm = moment(colonTime, "HH:mm").format("HH:mm");
    return `${dateString}T${hhmm}:00`;
  };

  const upsertForDate = (
    date: Date,
    changes: Partial<UnavailabilityDay> = {}
  ) => {
    const key = formatYMD(date);
    const existingIndex = entries.findIndex(
      (d) => d.unavailable_date_at === key
    );
    const base: UnavailabilityDay =
      existingIndex >= 0
        ? { ...entries[existingIndex] }
        : {
            dayOfWeek: getDayOfWeek(date),
            startTime: `${key}T09:00:00`,
            endTime: `${key}T17:00:00`,
            unavailableWholeDay: false,
            unavailable_date_at: key,
          };

    const updated: UnavailabilityDay = { ...base, ...changes };
    const next = [...entries];
    if (existingIndex >= 0) {
      next[existingIndex] = updated;
    } else {
      next.push(updated);
    }
    setUnavailableDates(next);
  };

  const selectedKey = selectedDate ? formatYMD(selectedDate) : undefined;
  const currentEntry = useMemo(
    () =>
      selectedKey
        ? entries.find((d) => d.unavailable_date_at === selectedKey)
        : undefined,
    [selectedKey, entries]
  );

  // Build modifier arrays for coloring
  const apiDates = useMemo(
    () => Array.from(initialApiDatesRef.current).map(parseYMDToLocalDate),
    [initialApiDatesRef.current]
  );

  return (
    <>
      <div className="space-y-3">
        <div className="font-medium">Set your unavailability</div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (!date) return;
            // normalize to local day boundary
            const normalized = parseYMDToLocalDate(formatYMD(date));
            setSelectedDate(normalized);
            const key = formatYMD(normalized);
            const newEntry: UnavailabilityDay = {
              dayOfWeek: getDayOfWeek(normalized),
              startTime: `${key}T09:00:00`,
              endTime: `${key}T17:00:00`,
              unavailableWholeDay: false,
              unavailable_date_at: key,
            };
            // Keep API dates (even if modified) + new user-selected date
            const apiEntries = entries.filter(
              (e) =>
                e.unavailable_date_at &&
                initialApiDatesRef.current.has(e.unavailable_date_at)
            );
            // Remove any previously selected user date that's not an API date
            const userSelectedDates = entries.filter(
              (e) =>
                e.unavailable_date_at &&
                !initialApiDatesRef.current.has(e.unavailable_date_at)
            );
            // Keep only current selection, replace previous user selection
            setUnavailableDates([...apiEntries, newEntry]);
          }}
          modifiers={{
            apiUnavailable: apiDates,
            apiUnavailableSelected: (day) =>
              initialApiDatesRef.current.has(formatYMD(day)) &&
              !!selectedDate &&
              formatYMD(day) === formatYMD(selectedDate),
          }}
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
          <Switch
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
          />
        </div>
        {selectedDate && currentEntry && !currentEntry.unavailableWholeDay && (
          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 pl-3">
            <div className="space-y-1">
              <Label>Start Time</Label>
              <div className="relative">
                <Input
                  type="time"
                  value={toUI(currentEntry.startTime)}
                  onChange={(e) => {
                    if (!selectedDate) return;
                    const apiValue = toAPI(
                      moment(e.target.value, "HH:mm").format("HH:mm"),
                      selectedDate
                    );
                    upsertForDate(selectedDate, { startTime: apiValue });
                  }}
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
                  value={toUI(currentEntry.endTime)}
                  onChange={(e) => {
                    if (!selectedDate) return;
                    const apiValue = toAPI(
                      moment(e.target.value, "HH:mm").format("HH:mm"),
                      selectedDate
                    );
                    upsertForDate(selectedDate, { endTime: apiValue });
                  }}
                />
                <Clock className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CalendarSelector;
