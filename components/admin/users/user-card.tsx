import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { Link, MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";
import { User } from "@/types/users";
interface UserCardProps {
    user: User
}
const UserCard = ({ user }: UserCardProps) => {
    const [userData, setUserData] = useState(user);
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
                <Badge variant={"secondary"}>completed</Badge>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem >
                            View  
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>
                            Active
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Inactive
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default UserCard;