"use client";
import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { changePasswordAction } from "@/utils/graphql/auth/action";
import { ChangePasswordType } from "@/types/profile";
import SimpleReactValidator from "simple-react-validator";

const defaultForm: ChangePasswordType = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const { toast } = useToast();
  const router = useRouter();
  const validator = useRef(
    new SimpleReactValidator({
      validators: {
        complex_password: {
          message: "Password must contain uppercase, lowercase, number & special character.",
          rule: (val: string) => {
            return (
              val.length >= 6 &&
              /[A-Z]/.test(val) &&
              /[a-z]/.test(val) &&
              /\d/.test(val) &&
              /[!@#$%^&*()_+\-={}';:"\\|,.<>/?]/.test(val)
            );
          },
        },
        match_password: {
          message: "Passwords do not match.",
          rule: (val: string, params: any[]) => val === params[0],
        },
      },

    })
  );
  const [forceUpdate, setForceUpdate] = useState(0);
  const [form, setForm] = useState(defaultForm);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validator.current.allValid()) {
      setForceUpdate(forceUpdate + 1);
      validator.current.showMessages();
      return;
    }

    const { confirmPassword, ...updatedForm } = form;

    setLoading(true);
    const res = await changePasswordAction(updatedForm);
    setLoading(false);

    if (res.success === false) {
      toast({
        title: "Password update failed",
        description:
          res.message || "Something went wrong while updating your password.",
        variant: "destructive",
      });
      return;
    }

    if (res.ChangePassword && res.ChangePassword.success === true) {
      toast({
        title: "Password updated",
        description:
          res.ChangePassword.message || "Your password was updated successfully.",
      });
    router.push("/educator/dashboard")
      // setForm(defaultForm);

    } else {
      toast({
        title: "Password update failed",
        description: "Unable to complete the action. Please try again.",
        variant: "destructive",
      });
    }
  
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <TabsContent value="password">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Set a new password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrent ? "text" : "password"}
                  value={form.currentPassword}
                  onChange={handleChange}
                  name="currentPassword"
                  placeholder="••••••••"
                  onBlur={() => validator.current.showMessageFor("currentPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setShowCurrent((s) => !s)}
                >
                  {showCurrent ? <EyeOff /> : <Eye />}
                </Button>
              </div>
              <div className="text-red-500 text-sm">
                {validator.current.message("currentPassword", form.currentPassword, "required")}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNew ? "text" : "password"}
                  value={form.newPassword}
                  onChange={handleChange}
                  name="newPassword"
                  placeholder="Minimum 8 characters"
                  onBlur={() => validator.current.showMessageFor("newPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setShowNew((s) => !s)}
                >
                  {showNew ? <EyeOff /> : <Eye />}
                </Button>
              </div>
              <div className="text-red-500 text-sm">
                {validator.current.message("newPassword", form.newPassword, "required")}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Retype New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  name="confirmPassword"
                  placeholder="Minimum 8 characters"
                  onBlur={() => validator.current.showMessageFor("confirmPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setShowConfirm((s) => !s)}
                >
                  {showConfirm ? <EyeOff /> : <Eye />}
                </Button>
              </div>
              <div className="text-red-500 text-sm">
                {validator.current.message("confirmPassword", form.confirmPassword, "required")}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Updating Password..." : "Update Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default ChangePassword;
