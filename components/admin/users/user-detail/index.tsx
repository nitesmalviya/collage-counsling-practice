import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/ui/page-header";
import { User } from "@/types/users";
import Image from "next/image";

interface UserDetailProps {
    user: User;
}

const UserDetails = ({ user }: UserDetailProps) => {

    return (
        <div className="w-full min-h-screen bg-background pb-8">
            <div className="container mx-auto px-4 py-8">
                <PageHeader title="User Details" description="View all information for this user." />
                <div className="mt-8">
                    <Card className="w-full">
                        <CardContent>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="relative size-20 overflow-hidden rounded-full border bg-white">
                                        <Image
                                            src={user.avatar_path || "/student-black-boy.svg"}
                                            alt={`${user.first_name ?? "User"} ${user.last_name ?? ""}`}
                                            fill
                                            sizes="80px"
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="font-medium">Profile</div>
                                </div>
                                <dl className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <dt className="text-sm text-white">First Name</dt>
                                        <dd className="font-regular py-2 px-4 rounded-lg border border-[#2d211d] min-h-9 flex items-center
">{user.first_name ?? ""}</dd>
                                    </div>
                                    <div className="space-y-2">
                                        <dt className="text-sm text-white">Last Name</dt>
                                        <dd className="font-regular py-2 px-4 rounded-lg border border-[#2d211d] min-h-9 flex items-center
">{user.last_name ?? ""}</dd>
                                    </div>
                                </dl >
                                <dl className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <dt className="text-sm text-white">Email</dt>
                                        <dd className="font-regular py-2 px-4 rounded-lg border border-[#2d211d] min-h-9 flex items-center
">{user.email ?? ""} </dd>
                                    </div>
                                    <div className="space-y-2">
                                        <dt className="text-sm text-white">Phone</dt>
                                        <dd className="font-regular py-2 px-4 rounded-lg border border-[#2d211d] min-h-9 flex items-center
">{user.phone ?? ""}</dd>
                                    </div>
                                </dl>
                                <dl className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <dt className="text-sm text-white">Role</dt>
                                        <dd className="font-regular py-2 px-4 rounded-lg border border-[#2d211d] min-h-9 flex items-center
">{user.role ?? ""} </dd>
                                    </div>
                                    <div className="space-y-2">
                                        <dt className="text-sm text-white">Specialization</dt>
                                        <dd className="font-regular py-2 px-4 rounded-lg border border-[#2d211d] min-h-9 flex items-center
">{user.profile?.specialization ?? ""}</dd>
                                    </div>
                                </dl>
                                <dl className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <dt className="text-sm text-white">Status</dt>
                                        <dd className="font-regular py-2 px-4 rounded-lg border border-[#2d211d] min-h-9 flex items-center
">{user.active_status ? "Active" : "Inactive"} </dd>
                                    </div>
                                    <div className="space-y-2">
                                        <dt className="text-sm text-white">Platform</dt>
                                        <dd className="font-regular py-2 px-4 rounded-lg border border-[#2d211d] min-h-9 flex items-center
">{user.platform ?? ""}</dd>
                                    </div>
                                </dl>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>

    )
}


export default UserDetails;