
import Users from "@/components/admin/users"
import { DEFAULT_PAGINATION } from "@/utils/constant";
import { getUsersAction } from "@/utils/graphql/users/action";

const AdminUsers = async () => {

  const res: any = await getUsersAction({
    filter: {
      limit: DEFAULT_PAGINATION.LIMIT,
      page: DEFAULT_PAGINATION.PAGE,
      role: null as string | null,
      sortOrder: 'DESC',
    }
  });

  const users = res?.users?.items || [];
  const totalUsers = res?.users?.totalUsers || 0;
  const studentsCount = res?.users?.totalStudents || 0;
  const educatorsCount = res?.users?.totalEducators || 0;

  return (
    <Users
      users={users}
      totalUsers={totalUsers}
      studentsCount={studentsCount}
      educatorsCount={educatorsCount} />
  )
}

export default AdminUsers;
