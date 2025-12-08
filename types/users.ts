export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  active_status: boolean;
  avatar_path: string | null;
  created_at: string;
  phone?: string;
  platform?: string;
  profile?: {
    specialization?: string | null;
    timezone?: string | null;
  } | null;
}

export interface UsersResponse {
  users: {
    total: number;
    totalUsers: number;
    totalStudents: number;
    totalEducators: number;
    pagination?: string | null;
    items: User[];
  };
}

export interface AdminUsersFilterInput {
  limit?: number | null;
  page?: number | null;
  role?: string | null;
  search?: string | null;
  sortOrder?: 'ASC' | 'DESC';
}

export interface UsersFilter {
  filter?: AdminUsersFilterInput;
}

export interface UsersPaginationType {
  page: number;
  limit: number;
  search: string;
  role: string | null;
  sortOrder: 'ASC' | 'DESC';
}

