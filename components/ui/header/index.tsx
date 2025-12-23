"use client"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, Calendar, MessageSquare, DollarSign, Clock, LogOut, User, Wallet, BookOpen, Coins } from "lucide-react"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { appLogout } from "@/store/actions/auth-action"
import defaultAvatar from "@/public/student-black-boy.svg";
import { getUpdatedTokenAction } from "@/utils/graphql/auth/action"
import { useEffect, useState } from "react";

interface TokenResponse {
  tokenBalance: number;
}

const Header = () => {
  const dispatch = useAppDispatch();
  const [resToken, setResToken] = useState(0);
  const { user } = useAppSelector((state) => state.auth)
  const router = useRouter();
  const pathname = usePathname();

  const avatarSrc =
    typeof user?.avatar_path === "string" && user.avatar_path.trim() !== ""
      ? user.avatar_path
      : defaultAvatar;

  const handleLogout = async () => {
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

  const fetchTokenResponse = async () => {
    try {
      const res = await getUpdatedTokenAction();
      if (typeof res === "number") {
        setResToken(res);
      }
    } catch (error) {
      console.log(error, "Token api is failed")
    }
  };

  useEffect(() => {
    fetchTokenResponse();
  }, []);

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
          <div className="flex items-center gap-4">
            {
              user?.role == "student" && (
                <a className="justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border shadow-xs dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md px-3 has-[&gt;svg]:px-2.5 flex items-center gap-2 bg-primary/5 border-primary/20 hover:bg-primary/5 hover:text-inherit" >
                  <Coins className="w-4 h-4 text-primary" />
                  <span className="font-semibold">{resToken}</span>
                  <span className="text-muted-foreground text-xs">Tokens</span>
                </a>
              )
            }
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
                  <Link
                    href={user?.role === "student" ? "/student/profile" : "/educator/profile"}
                    className="flex items-center gap-2"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}


export default Header;