import UserDetail from "@/components/admin/users/user-detail";
import { getUserAction } from "@/utils/graphql/users/action";
import { notFound } from "next/navigation";

export default async function UserDetailPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const user = await getUserAction(userId);
  if (!user) return notFound();
  return <UserDetail user={user} />;
}
