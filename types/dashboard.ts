// types/dashboard.ts

import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import { JSX } from "react/jsx-runtime";

export interface StudentDashboardData {
  map(arg0: (session: {
      created_at: string | number | Date;
      educator: any;
      duration_min: ReactNode; id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; educatorName: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; date: string | number | Date; time: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; duration: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; 
}) => JSX.Element): import("react").ReactNode;
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

