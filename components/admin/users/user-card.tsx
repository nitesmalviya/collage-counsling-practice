import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import Link from "next/link";
import { MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";
import { User } from "@/types/users";
import EditUserModal from "./edit-user";
import { getUserAction } from "@/utils/graphql/users/action";
interface UserCardProps {
    user: User
}
const UserCard = ({ user }: UserCardProps) => {
    const [userData, setUserData] = useState(user);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const [editOpen, setEditOpen] = useState(false);
    const [editUserId, setEditUserId] = useState<string | null>(null);
    const handleEditClick = () => {
        setEditUserId(userData.id);
        setEditOpen(true);
    };
    const handleUserUpdated = async () => {
        const updatedUser = await getUserAction(userData.id);
        if (updatedUser) setUserData(updatedUser);
    };

     
    return (
        <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
                <img
                    src={userData.avatar_path || "/student-black-boy.svg"}
                    alt={`${userData.first_name} ${userData.last_name}`.trim()}
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <p className="font-medium">{userData.first_name} {userData.last_name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant={userData.role === "active" ? "secondary" : "default"} className="capitalize">
                            {userData.role}
                        </Badge>
                        <span>•</span>
                        <span>Joined {userData.created_at}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant={userData.active_status ? "secondary" : "default"}>{userData.active_status ? "Active" : "Inactive"}</Badge>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/users/${userData.id}`}> View </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleEditClick}>Edit</DropdownMenuItem>
                        <DropdownMenuItem>
                            Active
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Inactive
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <EditUserModal
                    userId={editUserId}
                    open={editOpen}
                    onOpenChange={setEditOpen}
                    onUserUpdated={() => {
                        setEditOpen(false);
                        setEditUserId(null);
                        handleUserUpdated();
                    }}
                />
            </div>
        </div>
    )
}

export default UserCard;