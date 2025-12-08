import { time } from "console"

export type UserRole = "student" | "educator" | "admin"

export interface User {
  id: string
  email: string
  role: UserRole
  avatar?: string
  createdAt: Date
  active_status: boolean;
  avatar_path: string;
  created_at: string;
  first_name: string;
  name: string;
  last_login_at: string | null;
  last_name: string;
  phone: string;
  platform: string;
  profile: {
    timezone: string;
  }
}

export type Step = 1 | 2;

export interface ForgotPasswordForm {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export type SignupFormType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  active_status: boolean;
  platform: string;
  timezone: string;
  adminSignUp: boolean;
};
export interface SignInResponse {
  signIn?: {
    success: boolean;
    message: string;
    accessToken: string;
    refreshToken: string;
    token: string;
    user: User;
  }
  message: string
  success: boolean
}
export interface SignUpRespose {
  signUp?: SuccessResponse
  message: string;
  success: boolean;
}
export interface Session {
  id: string
  studentId: string
  educatorId: string
  title: string
  description: string
  scheduledAt: Date
  duration: number
  status: "scheduled" | "completed" | "cancelled"
  tokenCost: number
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: Date
  read: boolean
}

export interface WalletTransaction {
  id: string
  userId: string
  amount: number
  type: "credit" | "debit"
  description: string
  timestamp: Date
}

export interface Resource {
  id: string
  title: string
  description: string
  category: string
  fileUrl: string
  isPremium: boolean
  tokenCost?: number
  uploadedBy: string
  uploadedAt: Date
}

export interface College {
  id: string
  name: string
  location: string
  state: string
  type: "Public" | "Private"
  size: "Small" | "Medium" | "Large"
  acceptanceRate: number
  avgGPA: number
  avgSAT: number
  avgACT: number
  tuition: number
  ranking: number
  majors: string[]
  description: string
  image: string
  website: string
  matchScore?: number
}

export interface Application {
  id: string
  studentId: string
  collegeId: string
  collegeName: string
  collegeImage: string
  status: "Not Started" | "In Progress" | "Submitted" | "Accepted" | "Rejected" | "Waitlisted"
  deadline: string
  applicationFee: number
  requirements: ApplicationRequirement[]
  submittedDate?: string
  decisionDate?: string
  notes: string
}

export interface ApplicationRequirement {
  id: string
  name: string
  type: "Essay" | "Transcript" | "Test Score" | "Recommendation" | "Other"
  completed: boolean
  dueDate?: string
}



export interface Activity {
  id: string
  name: string
  role: string
  yearsInvolved: number
  hoursPerWeek: number
  description: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  duration: string
  description: string
}

export interface TestScore {
  id: string
  studentId: string
  testType: "SAT" | "ACT" | "AP" | "SAT Subject"
  subject?: string
  score: number
  maxScore: number
  date: string
  percentile?: number
}

export interface Essay {
  id: string
  studentId: string
  applicationId?: string
  title: string
  prompt: string
  content: string
  wordCount: number
  maxWords: number
  status: "Draft" | "In Review" | "Revised" | "Final"
  feedback?: EssayFeedback[]
  lastEdited: string
  version: number
}

export interface EssayFeedback {
  id: string
  educatorId: string
  educatorName: string
  comment: string
  timestamp: string
  rating?: number
}

export interface Document {
  id: string
  studentId: string
  name: string
  type: "Transcript" | "Resume" | "Essay" | "Recommendation" | "Other"
  fileUrl: string
  uploadDate: string
  size: string
  sharedWith: string[]
}

export interface Milestone {
  id: string
  title: string
  description: string
  dueDate: string
  category: "Testing" | "Applications" | "Essays" | "Financial Aid" | "Other"
  completed: boolean
  priority: "High" | "Medium" | "Low"
}

export interface FinancialAid {
  collegeId: string
  collegeName: string
  tuition: number
  roomAndBoard: number
  booksAndSupplies: number
  otherExpenses: number
  totalCost: number
  estimatedAid: number
  netCost: number
  scholarships: Scholarship[]
}

export interface Scholarship {
  id: string
  name: string
  amount: number
  deadline: string
  requirements: string
  status: "Available" | "Applied" | "Awarded" | "Denied"
}
export type SignInInput = {
  email: string;
  password: string;
}

export type SignUpInput = SignInInput & {
  firstName: string;
  lastName: string;
  role?: string;
  platform: string;
  active_status: boolean;
}
export type ConnectedUserType = {
  name: string;
  role: string;
  avatar: string;
}

export type SuccessResponse = {
  success: boolean;
  message: string;
};

export type AddNoteResponse = {
  addSessionNotes: SuccessResponse
};

export interface SingleErrorResponse {
  message: string;
  code: string;
  path: string[];
  extensions: {
    code: string;
    stacktrace: string[];
  };
  success?: boolean
}

export interface ErrorResponse {
  errors: SingleErrorResponse[];
}

export type SessionStatusOverview = {
  booked: number;
  cancelled: number;
  completed: number;
  total: number;
  upcoming: number;
  expired: number;
  waitingForApproval: number;
}
export type UserStatusOverview = {
  educators: number;
  students: number;
  total: number;
};


export type AnalyticsResponse = {
  getAnalytics: {
    message: string;
    sessionStatus: SessionStatusOverview
    success: boolean;
    userOverview: UserStatusOverview
  };

  messages: string;
};

export type TokenResponse = {
  message: string;
  gettoken: {
    message: string;
    success: boolean;
    tokenBalance: number;
  };
}

export type TimeSlot = {
  time: string;
  is_available: boolean;
  is_disabled?: boolean;
}