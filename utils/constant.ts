export const PUBLIC_PATH = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  HOME: "/",
};

export const PRIVATE_PATH = {
  DASHBOARD: "/dashboard",
};

export const ERROR_PATH = {
  NOT_FOUND: "/not-found",
};

export const ROUTES_PATH = {
  ...PUBLIC_PATH,
  ...PRIVATE_PATH,
  ...ERROR_PATH,
};

export const FIREBASE_COLLECTION_PATH = {
  CHATS: "chats",
  MESSAGES: "messages",
  USERS: "users",
};

export const FIREBASE_FIELDS_NAME = {
  MEMBERS_ID: "members_ids",
};

export const FIREBASE_QUERY_NAME = {
  ARRAY_CONTAINS: "array-contains",
};

export const RESOURCE_CATEGORIES = [
  { label: "All", value: null },
  { label: "Essay Writing", value: "ESSAY_WRITING" },
  { label: "Test Prep", value: "TEST_PREP" },
  { label: "Financial Aid", value: "FINANCIAL_AID" },
  { label: "Admissions", value: "ADMISSIONS" },
];

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
};
// Session Tabs Labels
export const SESSION_TABS = {
  UPCOMING: "Upcoming",
  COMPLETED: "Completed",
  ALL: "All",
  CANCELED: "Cancelled",
  EXPIRED: "Expired",
} as const;

// Default pagination
export const DEFAULT_PAGINATION = {
  PAGE: 1,
  LIMIT: 10,
} as const;

export const GAP_OPTIONS = [5, 10, 15, 30];


export const DEFAULT_AVAILABILITY_FORM = {
  availabilityDays: [
    {
      dayOfWeek: "MONDAY",
      startTime: "10.00",
      endTime: "19.00",
      fullDay: true,
    },
    {
      dayOfWeek: "TUESDAY",
      startTime: "10.00",
      endTime: "19.00",
      fullDay: true,
    },
    {
      dayOfWeek: "WEDNESDAY",
      startTime: "10.00",
      endTime: "19.00",
      fullDay: true,
    },
    {
      dayOfWeek: "THURSDAY",
      startTime: "10.00",
      endTime: "19.00",
      fullDay: true,
    },
    {
      dayOfWeek: "FRIDAY",
      startTime: "10.00",
      endTime: "19.00",
      fullDay: true,
    },
    {
      dayOfWeek: "SATURDAY",
      startTime: "10.00",
      endTime: "19.00",
      fullDay: true,
    },
    {
      dayOfWeek: "SUNDAY",
      startTime: "10.00",
      endTime: "19.00",
      fullDay: true,
    },
  ],
  break: { break_between_interval: 10, interval_status: true },
  lunchBreak: { startTime: "14.00", endTime: "15.00", lunchBreak: true },
  slot_duration: [30, 60],
  unavailabilityDays: [],
  "overrides": null,

};

export const VIDEO_CALL = {
  JOINED: "call.session_participant_joined",
  LEFT: "call.session_participant_left"
};

export const LOCAL_STORAGE_KEYS = {
  isInCall: 'isInCall',
  sessionToken: 'sessionToken',
};
export const ROLES_MAP = {
  STUDENT: "student",
  EDUCATOR: "educator",
  ADMIN: "admin",
};

export const daysOfWeekOrder = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
]

export const SESSION_STATUS = {
  WAIT_FOR_APPROVAL: "WAIT_FOR_APPROVAL",
  BOOKED: "BOOKED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
  RESCHEDULED: "RESCHEDULED",
} as const;

export const TERMS_CONDITIONS = [
  "Once a session is booked, the student can reschedule it up to 24 hours before the scheduled start time.",
  "Sessions cannot be rescheduled within 24 hours of the scheduled start time.",
  "No additional tokens will be charged for rescheduling a session."]

export const educatorFAQ = [
  { question: "How do I register as an educator?", answer: "Educators cannot self-register. The admin will create the profile, and you’ll receive login credentials to access your account." },
  { question: "How can I set my availability for sessions?", answer: "After logging in, you can set your available time slots under the Availability section. These slots will be visible to all registered students for booking." },
  { question: "Can I modify or cancel a session once it’s booked?", answer: "No, educators cannot reschedule or cancel sessions once they are booked by a student." },
  { question: "What happens when a student books one of my available slots?", answer: "Once a student books a slot, that time slot will be disabled for other students, ensuring one-on-one sessions." },
  { question: "Can I view my past and upcoming sessions?", answer: "Yes, you can view both your upcoming and completed sessions from your educator dashboard." },
  { question: "How are session prices or token values decided?", answer: "Session pricing (in tokens) is determined by the admin." }
];

export const studentFAQ = [
  { question: "How can I sign up as a student?", answer: "You can register directly on the portal using your details. Once registered, you’ll receive bonus tokens in your wallet to book sessions." },
  { question: "How do I book a session with an educator?", answer: "After logging in, view the available time slots under the 'Availability' section set by the educators and book a session that suits you." },
  { question: "What happens if another student books the same slot?", answer: "Each time slot can only be booked by one student. Once booked, that slot will no longer be available to others." },
  { question: "Can I reschedule my session?", answer: "Yes, you can reschedule your session up to 24 hours before the scheduled start time without any additional token charge." },
  { question: "Can I cancel my session?", answer: "Yes, you can cancel your session before 24 hours of the start time to get a full token refund. Cancellations made within 24 hours won’t be refunded." },
  { question: "What if I don’t join the session on time?", answer: "If you don’t join within 10 minutes of the scheduled time, the session will be marked as expired, and tokens won’t be refunded." },
  { question: "Can I chat with educators?", answer: "Yes, students can chat with any educator anytime through the chat feature." },
  { question: "What are the session durations available?", answer: "Admin provides two session durations — 30 minutes and 60 minutes. You can choose as per your need, and tokens will be deducted accordingly." }
];

// User Management Tabs (admin view)
export const USER_TAB_KEYS = {
  all: '',
  student: 'student',
  educator: 'educator',
} as const;
export type UserTabKey = keyof typeof USER_TAB_KEYS;
export const USER_TAB_LABELS: Record<UserTabKey, string> = {
  all: 'All Users',
  student: 'Students',
  educator: 'Educators',
};

export const COLORS = {
  red: 'var(--chart-1)',
  green: 'var(--chart-2)',
  orange: 'var(--chart-3)',
  yellow: 'var(--chart-4)',
  pink: 'var(--chart-5)',
};

export const ERROR_MSG = {
  network: 'Network Error: Unable to connect to the server'
}