// types/dashboard.ts

export interface StudentDashboardData {
  completedSessions: number;
  tokenBalance: number;
  upcomingSessions: number;
}

export interface StudentDashboardResponse {
  getStudentDashboard: StudentDashboardData;
}

export interface EducatorDashboardData {
  activeStudents: number;
  averageRating: number;
  sessionsThisWeek: number;
  totalEarnings: number;
}

export interface EducatorDashboardResponse {
  getEducatorDashboard: EducatorDashboardData;
}

// Admin dashboard
export interface AdminUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  active_status: boolean;
  created_at: string;
}

export interface AdminDashboardData {
  users: AdminUser[];
  activeSessions: number;
  growthRate: number;
  revenue: number;
  totalusers: number;
}

export interface AdminDashboardResponse {
  getAdminDashboard: AdminDashboardData;
}

// Recent Transactions (Admin)
export interface RecentTransactionUser {
  first_name: string;
  last_name: string;
}

export interface RecentTransactionItem {
  amount: number;
  created_at: string;
  user: RecentTransactionUser;
}

export interface RecentTransactionsData {
  completed: number;
  pending: number;
  total: number;
  items: RecentTransactionItem[];
}

export interface RecentTransactionsResponse {
  paymentList: RecentTransactionsData;
}

