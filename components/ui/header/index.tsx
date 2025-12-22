"use client"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, Calendar, MessageSquare, DollarSign, Clock, LogOut, User, Wallet, BookOpen } from "lucide-react"
import Link from "next/link"
import { getUserDetails } from "@/utils/common-service"
import { useAppDispatch } from "@/store/hooks"
import { appLogout } from "@/store/actions/auth-action"
import defaultAvatar from "@/public/student-black-boy.svg";

export function Header() {
  const dispatch = useAppDispatch();
  const user = getUserDetails();
  const router = useRouter();
  const pathname = usePathname();
  const avatarSrc =
    typeof user?.avatar_path === "string" && user.avatar_path.trim() !== ""
      ? user.avatar_path
      : defaultAvatar;

  const logout = async () => {
    try {
      const res = await dispatch(appLogout());
      router.push("/");
      return res;
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  const educatorNavItems = [
    { href: "/educator/dashboard", label: "Dashboard", icon: Home },
    { href: "/educator/sessions", label: "Sessions", icon: Calendar },
    { href: "/educator/chat", label: "Chat", icon: MessageSquare },
    { href: "/educator/availability", label: "Availability", icon: Clock },
    { href: "/educator/earnings", label: "Earnings", icon: DollarSign },
  ]

  const studentNavItems = [
    { href: "/student/dashboard", label: "Dashboard", icon: Home },
    { href: "/student/sessions", label: "Sessions", icon: Calendar },
    { href: "/student/chat", label: "Chat", icon: MessageSquare },
    { href: "/student/wallet", label: "Wallet", icon: Wallet },
    { href: "/student/resources", label: "Resources", icon: BookOpen },
  ]

  if (user?.role === "student") {
    educatorNavItems.splice(0, educatorNavItems.length, ...studentNavItems);
  }

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/educator/dashboard" className="text-xl font-bold">
              Pathfinder
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {educatorNavItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Button key={item.href} variant={isActive ? "secondary" : "ghost"} size="sm" asChild>
                    <Link href={item.href} className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  </Button>
                )
              })}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  {/* <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} /> */}
                  <Image
                    src={avatarSrc}
                    alt={`${user?.first_name} ${user?.last_name}`}
                    width={100}
                    height={100}
                    className="object-cover rounded-full"
                  />
                  {!user?.avatar_path && (
                    <AvatarFallback>
                      {user?.first_name?.charAt(0)}
                      {user?.last_name?.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.first_name} {user?.last_name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuItem asChild>
                <Link href={`/educator/profile`}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
