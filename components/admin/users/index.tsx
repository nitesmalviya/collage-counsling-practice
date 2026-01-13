"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, FileX } from "lucide-react"
import UserCard from "./user-card"
import { useCallback, useEffect, useState } from "react"
import { getUsersAction } from "@/utils/graphql/users/action"
import type { User } from "@/types/users"
import { defaultUserPagination, getUserCountForTab, getUserTabKey } from "@/utils/common-service"
import { USER_TAB_KEYS } from "@/utils/constant"
import DataNotFound from "@/components/ui/data-not-found"
import AddUserModal from "./add-user"

type SessionStatus = "all" | "students" | "educators";

interface UsersProps {
    users: User[];
    totalUsers: number;
    studentsCount: number;
    educatorsCount: number;
}

const Users = ({
    users: initialUsers,
    totalUsers: initialTotalUsers,
    studentsCount: initialStudentsCount,
    educatorsCount: initialEducatorsCount, }
    : UsersProps) => {
    const [status, setStatus] = useState<SessionStatus>("all");
    const [tabState, setTabState] = useState<Record<UserTabKey, {
        users: User[],
        pagination: UsersPaginationType,
        total: number,
        isLoading: boolean,
        loading: boolean,
    }>>({
        all: {
            users: initialUsers,
            pagination: defaultUserPagination('all'),
            total: initialTotalUsers,
            isLoading: false,
            loading: false,
        },
        student: {
            users: [],
            pagination: defaultUserPagination('student'),
            total: initialStudentsCount,
            isLoading: false,
            loading: false,
        },
        educator: {
            users: [],
            pagination: defaultUserPagination('educator'),
            total: initialEducatorsCount,
            isLoading: false,
            loading: false,
        },
    });
    const [activeTab, setActiveTab] = useState<string>(USER_TAB_KEYS.all);
    const derivedTabKey: UserTabKey = getUserTabKey(activeTab);
    const activeState = tabState[derivedTabKey];
    const [loading, setLoading] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

    const fetchTabUsers = useCallback(
        async (targetTab: UserTabKey, opts: { page?: number; search?: string; append?: boolean } = {}) => {
            setTabState(prev => ({
                ...prev,
                [targetTab]: {
                    ...prev[targetTab],
                    loading: true,
                    isLoading: !!opts.append,
                }
            }));
            const role = targetTab === 'all' ? null : targetTab.toUpperCase();
            const prevPagination = tabState[targetTab].pagination;
            const pagination = {
                ...prevPagination,
                ...(opts.page ? { page: opts.page } : {}),
                ...(opts.search !== undefined ? { search: opts.search } : {}),
                role,
            };
            try {
                const response = await getUsersAction({
                    filter: {
                        limit: pagination.limit,
                        page: pagination.page,
                        role: pagination.role,
                        search: pagination.search || null,
                        sortOrder: pagination.sortOrder,
                    },
                });
                const fetchedUsers = response?.users?.items || [];
                const total = getUserCountForTab(
                    targetTab, response?.users?.totalUsers || 0, response?.users?.totalStudents || 0, response?.users?.totalEducators || 0
                );
                setTabState(prev => ({
                    ...prev,
                    [targetTab]: {
                        ...prev[targetTab],
                        users: opts.append ? [...prev[targetTab].users, ...fetchedUsers] : fetchedUsers,
                        pagination,
                        total,
                        loading: false,
                        isLoading: false,
                    },
                }));
            } catch (error) {
                setTabState(prev => ({ ...prev, [targetTab]: { ...prev[targetTab], loading: false, isLoading: false } }));
                console.error('Error fetching users:', error);
            }
        },
        [tabState]
    );

    const handleTabChange = useCallback((value: string) => {
        setActiveTab(value);
        const tabKey = getUserTabKey(value);
        if (tabState[tabKey].users.length === 0 && tabKey !== 'all') {
            fetchTabUsers(tabKey, { page: 1 });
        }
    }, [fetchTabUsers, tabState]);

    const handleUserCreated = useCallback(() => {
        fetchTabUsers(derivedTabKey, { page: 1 });
    }, [derivedTabKey, fetchTabUsers]);

    useEffect(() => {
        if (tabState.all.users.length === 0) {
            fetchTabUsers('all', { page: 1 });
        }
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">User Management</h1>
                            <p className="text-muted-foreground">Manage all platform users</p>
                        </div>
                        <Button onClick={() => setIsAddUserModalOpen(true)}>
                            Add New User
                        </Button>
                    </div>

                    {/* Search and Filter */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input placeholder="Search users..." className="pl-10" />
                                </div>
                                <Button variant="outline">
                                    <Filter className="w-4 h-4 mr-2" />
                                    Filter
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
                        <TabsList>
                            <TabsTrigger value={USER_TAB_KEYS.all}>All Users ({tabState.all.total})</TabsTrigger>
                            <TabsTrigger value={USER_TAB_KEYS.student}>Students ({tabState.student.total})</TabsTrigger>
                            <TabsTrigger value={USER_TAB_KEYS.educator}>Educators ({tabState.educator.total})</TabsTrigger>
                        </TabsList>

                        {/* Loading State */}
                        {activeState.loading && (
                            <div className="flex items-center justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        )}
                        {/* Main User List */}
                        {!activeState.loading && activeState.users.length > 0 && (
                            <div className="space-y-3">
                                {activeState.users.map((user: User) => (
                                    <UserCard key={user.id} user={user} showRole={true} />
                                ))}
                            </div>
                        )}
                        {/* No Data State */}
                        {!activeState.loading && activeState.users.length === 0 && (
                            <DataNotFound
                                title={
                                    derivedTabKey === "all"
                                        ? "No users found"
                                        : derivedTabKey === "student"
                                            ? "No students found"
                                            : "No educators found"
                                }
                                description={
                                    derivedTabKey === "all"
                                        ? "There are no users to display."
                                        : derivedTabKey === "student"
                                            ? "There are no students to display."
                                            : "There are no educators to display."
                                }
                                iconSlot={<FileX className="size-6" />} />
                        )}


                    </Tabs>
                </div>
            </div>
            {/* Add User Modal */}
            <AddUserModal
                open={isAddUserModalOpen}
                onOpenChange={setIsAddUserModalOpen}
                onUserCreated={handleUserCreated}
            />
        </div>
    )

}

export default Users;