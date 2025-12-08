export interface GetEducatorResponse {
  GetEducatorAvailability: GetEducatorAvailability
}

export interface GetEducatorAvailability {
  availabilityDays: AvailabilityDay[]
  unavailabilityDays: UnavailabilityDay[]
  timezone?: string
  success?: boolean
  slot_duration: number[]
  overrides: Override[]
  message: string
  lunchBreak: LunchBreak
  break: Break
}

export interface AvailabilityDay {
  dayOfWeek: string
  endTime: string
  fullDay: boolean
  startTime: string
}

export interface UnavailabilityDay {
  dayOfWeek: string
  endTime?: string
  fullDay?: boolean
  startTime?: string
  unavailableWholeDay?: boolean
  unavailable_date_at?: string
}

export interface Override {
  dayOfWeek: string
  endDateTime: string
  startDateTime: string
}

export interface LunchBreak {
  endTime: string
  lunchBreak: boolean
  startTime: string
}

export interface Break {
  break_between_interval: number
  interval_status: boolean
}

// Input for setting availability
export interface SetAvailabilityInput {
  availabilityDays: AvailabilityDay[]
  break: Break
  lunchBreak: LunchBreak
  overrides: Override[] | null
  slot_duration: number[]
  unavailabilityDays?: UnavailabilityDay[] | null
}

export interface AvailabilityProps {
  data: GetEducatorAvailability;
}

export interface AvailabilitySettingsProps {
  form: GetEducatorAvailability;
  onSubmit: (data: SetAvailabilityInput) => void;
}


// Prefer using AvailabilityDay everywhere instead of a duplicate name

export interface UnavailabilitySettingsProps {
  form: GetEducatorAvailability;
  onSubmit: (data: SetAvailabilityInput) => void;
}


export interface DayRowProps {
  readonly day: AvailabilityDay;
  readonly setDays: (days: Record<string, AvailabilityDay> | ((prev: Record<string, AvailabilityDay>) => Record<string, AvailabilityDay>)) => void;
  readonly dayOfWeek: string; 
}


export interface BreakSettingsProps {
  enableLunchBreak: boolean;
  setEnableLunchBreak: (enabled: boolean) => void;
  lunchStart: string;
  setLunchStart: (time: string) => void;
  lunchEnd: string;
  setLunchEnd: (time: string) => void;
  enableGap: boolean;
  setEnableGap: (enabled: boolean) => void;
  gapMinutes: number;
  setGapMinutes: (minutes: number) => void;
}

// Mutation response types
export interface SetEducatorAvailabilityPayload {
  message: string
  success: boolean
}

export interface SetEducatorAvailabilityResponse {
  SetEducatorAvailability: SetEducatorAvailabilityPayload
}
