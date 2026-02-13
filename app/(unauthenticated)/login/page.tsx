"use client"

import type React from "react"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { BookOpen, EyeOff, Eye } from "lucide-react"
import SimpleReactValidator from "simple-react-validator";
import { SignInInput } from "@/lib/types"
import { login } from "@/store/actions/auth-action";
import { useAppDispatch } from "@/store/hooks"

const defaultForm: SignInInput = {
  email: "",
  password: "",
}

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const validator = useRef(
    new SimpleReactValidator()
  );
  const [form, setForm] = useState(defaultForm);
  const [isLoading, setIsLoading] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validator.current.allValid()) {

      setIsLoading(true);

      const res = await dispatch(login(form));

      if (res?.signIn?.success) {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        router.push("/educator/dashboard")
      } else {
        toast({
          title: "Login failed",
          description: res?.message,
          variant: "destructive",
        });
      }
    } else {
      validator.current.showMessages();
      setForceUpdate(forceUpdate + 1);
    }
    setIsLoading(false);

  }

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    validator.current.showMessageFor(e.target.name);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Sign in to your Pathfinder account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or sign in with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                onBlur={() => validator.current.showMessageFor("email")}
              />
              <div className="text-red-500 text-sm">
                {validator.current.message(
                  "email",
                  form.email,
                  "required|email"
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={() => validator.current.showMessageFor("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <div className="text-red-500 text-sm">
                {validator.current.message(
                  "password",
                  form.password,
                  "required"
                )}
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>




          <div className="text-center text-sm">
            {"Don't have an account? "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

