"use client";
import { useState, useRef, useEffect, type ChangeEvent, type FormEvent, ReactHTMLElement } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SimpleReactValidator from "simple-react-validator";
import { adminRoleList } from "@/components/admin/constant";
import { getUserAction, updateUserAction } from "@/utils/graphql/users/action";
import { formatPhoneNumber, phoneValidationRule } from "@/utils/common-service";
import { update } from "@/store/reducers/userReducer";

interface EditUserModalProps {
  userId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserUpdated?: () => void;
}

const defaultEditForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  role: "STUDENT",
};

const EditUserModal = ({ userId, open, onOpenChange, onUserUpdated }: EditUserModalProps) => {
  const [form, setForm] = useState<any>(defaultEditForm);
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  const validator = useRef(
    new SimpleReactValidator({
      validators: {
        usPhone: phoneValidationRule,
      },
    })
  );

  useEffect(() => {
    if (open && userId) {
      setFetching(true);
      getUserAction(userId).then((user) => {
        if (user) {
          setForm({
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            email: user.email || "",
            role: user.role || "",
            id: user.id
          })
        }
        validator.current.hideMessages();
        setForceUpdate(v => v + 1);
        setFetching(false);
      })
    } else if (!open) {
      setForm(defaultEditForm);
      setForceUpdate(v => v + 1);
      validator.current.hideMessages();
    }
  }, [open, userId])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    validator.current.showMessageFor(event.target.name);
  }

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    const cleanedValue = value.replace(/[^\d\s()-]/g, "");
    const digitsOnly = cleanedValue.replace(/\D/g, "");
    if (digitsOnly.length <= 10) {
      const formattedNumber = formatPhoneNumber(digitsOnly);
      setForm((f: any) => ({...f, phone: formattedNumber}));
      validator.current.showMessageFor("phone");
    }
  }

  const handleRadioChange = (value: string) => {
    setForm((f:any) => ({...f, role: value.toUpperCase() }));
    validator.current.showMessageFor("role")
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    debugger
    if (!validator.current.allValid()) {
      validator.current.showMessages();
      setForceUpdate(f => f + 1);
      return;
    }
    setIsLoading(true);
    await updateUserAction({
      updateUserId: form.id,
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: form.phone,
      role: form.role,
      avatar_path: form.avatar_path
    });
    setIsLoading(false);
    onOpenChange(false);
    onUserUpdated?.();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto" onInteractOutside={e => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
        </DialogHeader>
        {fetching ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-6">
              <RadioGroup
                value={(form.role || '').toLowerCase()}
                onValueChange={handleRadioChange}
                className="grid grid-cols-2 gap-6"
              >
                {adminRoleList.map((roleOption: any) => (
                  <div
                    key={roleOption.value}
                    className="flex items-center space-x-3 p-6 rounded-lg border hover:bg-accent/50 cursor-pointer"
                  >
                    <RadioGroupItem disabled value={roleOption.value} id={roleOption.value} />
                    <Label htmlFor={roleOption.value} className="flex items-center gap-2 cursor-pointer flex-1">
                      {roleOption.icon}
                      <span>{roleOption.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                onBlur={() => validator.current.showMessageFor("first_name")}
              />
              <div className="text-red-500 text-sm">
                {validator.current.message("first_name", form.first_name, "required|min:3")}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                onBlur={() => validator.current.showMessageFor("last_name")}
              />
              <div className="text-red-500 text-sm">
                {validator.current.message("last_name", form.last_name, "required|min:3")}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                readOnly
              />
              <div className="text-red-500 text-sm">
                {validator.current.message("email", form.email, "required|email")}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handlePhoneChange}
                maxLength={14}
                placeholder="(555) 123-4567"
                onBlur={() => validator.current.showMessageFor("phone")}
              />
              <div className="text-red-500 text-sm">
                {validator.current.message("phone", form.phone, "required|usPhone")}
              </div>
            </div>
            <div className="flex gap-3 justify-end pt-4">
              <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
