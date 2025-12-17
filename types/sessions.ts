// types/sessions.ts

export interface Educator {
  first_name: string;
  last_name: string;
  phone: string;
  id: string;
  profile?: {
    specialization: string;
  };
}

export interface Student {
  first_name: string;
  last_name: string;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  durationMin: number;
  educatorId: string;
  studentId: string;
  status: string;
  scheduledAt: string;
  startedAt: string | null;
  endedAt: string | null;
  cancelledAt: string | null;
  rescheduledAt: string | null;
  roomUrl: string | null;
  room_url: string | null;
  createdAt: string;
  updatedAt: string;
  educator: Educator;
  student: Student;
  scheduled_at_start_time: string;
  rescheduled_at_start_time: string;
  duration_min: number;
  
}

export interface GetMySessionsResponse {
  getSessions: {
    total: number;
    completedCount: number;
    upcomingCount: number;
    canceledCount?: number;
    expiredCount?: number;
    sessions: Session[];
  };
}

export interface SessionFilterInput {
  limit?: number;
  page?: number;
  filter?: string;
}

export interface SessionFilter {
  filter: SessionFilterInput;
}

// Session interface for SessionCard component
export interface SessionCardSession {
  id: string;
  title: string;
  educatorName: string;
  date: string;
  time: string;
  duration: number;
  status: "upcoming" | "completed";
  type: string;
  notes?: string;
}

// Cancel session types (snake_case as returned by API)
export interface CancelledByUser {
  first_name: string;
  id: string;
  last_name: string;
}

export interface CancelledSessionPayload {
  active_status: boolean;
  cancelledBy: CancelledByUser | null;
  cancelled_at: string | null;
  cancelled_by: string | null;
  created_at: string;
  description: string | null;
  duration_min: number;
  ended_at: string | null;
  id: string;
  room_metadata: string | null;
  room_url: string | null;
  started_at: string | null;
  status: string;
  student_id: string;
  title: string | null;
  educator: { first_name: string; last_name: string };
  educator_id: string;
  scheduled_at_end_time: string;
  scheduled_at_start_time: string;
}

export interface CancelSessionResponse {
  cancelSession: {
    message?: string;
    success: boolean;
    session?: CancelledSessionPayload;
  };
}

// Educator types for educatorsList
export interface EducatorUser {
  avatar_path: string | null;
  first_name: string;
  last_name: string;
}

export interface EducatorItem {
  id: string;
  session_amount: any
  profile: {
    session_topic: string;
    amount: number;
    bio: string;
    created_at: string;
    currency_type: string;
    duration: number[];
    id: string;
    specialization: string;
    user_id: string;
    user: EducatorUser;
  };
}

export interface EducatorsListResponse {
  educatorsList: {
    total: number;
    educators: EducatorItem[];
  };
}

export interface EducatorsListFilter {
  limit?: number;
  page?: number;
  search?: string;
}

export interface EducatorsListFilterInput {
  filter: EducatorsListFilter;
}

export interface EducatorsPaginationType {
  page: number;
  limit: number;
  search?: string;
}

// Session Notes types
export interface SessionNote {
  id: string;
  content: string;
  created_at: string;
}

export interface GetSessionNotesResponse {
  getSessionNotes: {
    success: boolean;
    message?: string;
    session_notes: SessionNote | null;
  };
}

export interface GetSessionNotesInput {
  sessionId: string;
}

// Slots
export interface SlotItem {
  end_datetime: string;
  end_time: string; // HH:mm:ss
  is_available: boolean;
  start_datetime: string;
  start_time: string; // HH:mm:ss
}

export interface GetSlotsResponse {
  code?: string;
  message: string;
  getSlot: {
    message: string;
    success: boolean;
    slots: SlotItem[];
  }
}

export interface GetSlotInput {
  input: {
    date: string; // YYYY-MM-DD
    day: string; // e.g., THURSDAY
    educator_id: string;
    slot_minutes: number; // 30 or 60
  };
  [key: string]: unknown; // allow passing as Record<string, unknown>
}

// Educator profile (for booking)
export interface EducatorAvailabilityItem {
  active_status: boolean;
  created_at: string;
  day_of_week: string; // e.g., MONDAY
  end_time: string; // HH:mm:ss
  id: string;
  is_recurring: boolean;
  start_time: string; // HH:mm:ss
  updated_at: string;
  user_id: string;
}

export interface EducatorProfileUserProfile {
  amount: number | null;
  bio: string | null;
  duration: number[];
  specialization: string | null;
  id: string;
}

export interface EducatorProfileUser {
  last_name: string;
  first_name: string;
  avatar_path: string | null;
  id: string;
  profile: EducatorProfileUserProfile;
}

export interface EducatorProfileData {
  amount: number;
  availabilities: EducatorAvailabilityItem[];
  averageRating: number;
  totalreviews: number;
  user: EducatorProfileUser;
  session_amount: string
}

export interface GetEducatorProfileResponse {
  GetEducatorProfile: EducatorProfileData;
}

// Create session types
export interface CreateSessionInput {
  day: string; // e.g., MONDAY
  educatorId: string;
  meetingDate: string; // YYYY-MM-DD
  slot: number; // minutes (30 or 60)
  startTime: string; // HH.mm
  studentId: string;
  id?: string;
  description?: string;
  title?: string;
}

export interface CreateSessionVariables {
  input: CreateSessionInput;
}

export interface CreateSessionResponse {
  createSession?: {
    message?: string;
    success?: boolean;
  };
  rescheduledSession?: {
    message?: string;
    success?: boolean;
  }
  message?: string; // fallback error message shape from fetchGraphQLMutation
}

// Educator view model for booking form
export interface EducatorVM {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  specialty: string;
  bio?: string;
  avatar?: string;
  availability: string[];
  durations: number[];
  amountTokens: number;
}

