import type { User } from "./types"

export const TEST_USERS: Record<string, User> = {
  student: {
    id: "test-student-1",
    email: "student@test.com",
    name: "Alex Student",
    role: "student",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    createdAt: new Date("2024-01-01"),
  },
  educator: {
    id: "test-educator-1",
    email: "educator@test.com",
    name: "Dr. Sarah Educator",
    role: "educator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    createdAt: new Date("2024-01-01"),
  },
  admin: {
    id: "test-admin-1",
    email: "admin@test.com",
    name: "Admin User",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    createdAt: new Date("2024-01-01"),
  },
}
