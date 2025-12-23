"use client";

import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Camera } from "lucide-react";
import SimpleReactValidator from "simple-react-validator";
import { getPresignedUrl, getUserDetails, phoneValidationRule } from "@/utils/common-service";
import { useAppDispatch } from "@/store/hooks";
import { updateUser } from "@/store/actions/auth-action";
import defaultAvatar from "@/public/student-black-boy.svg";

interface UserForm {
  updateUserId: string;
  fileUploadPath: string;
  first_name: string;
  last_name: string;
  phone: string;
  selectedFilePath?: string;
  email: string;
  role: string;
  avatar_path: string;
}

const Profile = () => {
  const userDetails = getUserDetails();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const validator = useRef(
    new SimpleReactValidator({
      validators: {
        usePhone: phoneValidationRule,
      },
    })
  );

  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  const defaultForm = {
    updateUserId: userDetails?.id || "",
    fileUploadPath: "",
    first_name: userDetails?.first_name || "",
    last_name: userDetails?.last_name || "",
    phone: userDetails?.phone || "",
    email: userDetails?.email || "",
    role: userDetails?.role || "",
    avatar_path: userDetails?.avatar_path ?? defaultAvatar,
  };

  const [form, setForm] = useState<UserForm>(defaultForm);
  const [isLoading, setIsLoading] = useState(false);
  const [chosenFile, setChosenFile] = useState<File | null>(null);
  const [forceUpdate, setForceUpdate] = useState(0);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setChosenFile(file);
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let fileUploadPath: any;
    let res: any;

    if (!validator.current.allValid()) {
      setForceUpdate(forceUpdate + 1);
      validator.current.showMessages();
      return;
    }

    setIsLoading(true);
    const submitFormData = {
      ...form,
      phone: form.phone.replace(/\D/g, ""),
    };

    if (chosenFile) {
      fileUploadPath = await getPresignedUrl(chosenFile, toast);
      res = await dispatch(updateUser(submitFormData, fileUploadPath));
    } else {
      res = await dispatch(updateUser(submitFormData, fileUploadPath));
    }
    setIsLoading(false);

    if (res) {
      toast({
        title: "Profile updated",
        description: "Your profile details were saved."
      });
    } else {
      toast({
        title: "Failed to update profile",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };


  return (
    <TabsContent value="profile">
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative size-20 overflow-hidden rounded-full border">
                {chosenFile ? (
                  <Image
                    src={URL.createObjectURL(chosenFile)}
                    alt="Profile"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src={form.avatar_path}
                    alt="Profile"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <div className="font-medium">Profile Pic</div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => avatarInputRef.current?.click()}
                  className="mt-1"
                >
                  <Camera className="mr-2 h-4 w-4" /> Change Profile Photo
                </Button>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleInputChange}
                  onBlur={() => validator.current.showMessageFor("first_name")}
                />
                <div className="text-red-500 text-sm">
                  {validator.current.message(
                    "first_name",
                    form.first_name,
                    "required"
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleInputChange}
                  onBlur={() => validator.current.showMessageFor("last_name")}
                />
                <div className="text-red-500 text-sm">
                  {validator.current.message(
                    "last_name",
                    form.last_name,
                    "required"
                  )}
                </div>

              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" value={form.email} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="(555) 123-4567"
                  maxLength={14}
                  value={form.phone}
                  onChange={handleInputChange}
                  onBlur={() => validator.current.showMessageFor("phone")}
                />
                <div className="text-red-500 text-sm">
                  {validator.current.message(
                    "phone",
                    form.phone,
                    "required"
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <div className="relative">
                  <Input
                    id="role"
                    type="text"
                    name="role"
                    value={form.role}
                    readOnly />
                </div>
              </div>

            </div>

            <div className="flex items-center justify-start">
              <Button
                type="submit"
                size="lg"
                className="px-8"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Save & Update"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

export default Profile;