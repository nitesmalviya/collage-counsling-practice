"use client"

import { useState, useRef, type ChangeEvent, type FormEvent } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { SignupFormType, UserRole } from "@/lib/types"
import { signUp } from "@/store/actions/auth-action"
import SimpleReactValidator from "simple-react-validator"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DEFAULT_TIMEZONE, strongRegex, USER_CREATION_MESSAGES, adminRoleList } from "@/components/admin/constant"

const defaultSignupForm: SignupFormType = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "STUDENT" as UserRole,
    active_status: true,
    platform: "WEB",
    timezone: DEFAULT_TIMEZONE,
    adminSignUp: true
}

interface AddUserModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onUserCreated?: () => void
}

const AddUserModal = ({ open, onOpenChange, onUserCreated }: AddUserModalProps) => {

    const { toast } = useToast()
    const [form, setForm] = useState<SignupFormType>(defaultSignupForm)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [forceUpdate, setForceUpdate] = useState(0)


    const validator = useRef(
        new SimpleReactValidator({
            validators: {
                strong_password: {
                    message: USER_CREATION_MESSAGES.VALIDATION_PASSWORD_STRONG,
                    rule: (val: string) => {
                        return strongRegex.test(val)
                    },
                },
            },
        })
    )


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        debugger
        setForm(form);
        console.log(form, "form data");

        setIsLoading(false)
    }

    const handleClose = () => {
        setForm(defaultSignupForm)
        setShowPassword(false)
        setForceUpdate(forceUpdate + 1)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto" onInteractOutside={e => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Add New User</DialogTitle>
                    <DialogDescription>Add a new user to the platform</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-6">
                        <Label>Role</Label>
                        <RadioGroup
                            value={form.role.toLowerCase()}
                            onValueChange={(value) => {
                                setForm({ ...form, role: value.toUpperCase() as UserRole })
                            }}
                            className="grid grid-cols-2 gap-6"
                        >
                            <div className="flex items-center space-x-3 p-6 rounded-lg border hover:bg-accent/50 cursor-pointer">
                                <RadioGroupItem value="student" id="student" />
                                <Label
                                    htmlFor="student"
                                    className="flex items-center gap-2 cursor-pointer flex-1"
                                >
                                    <span>Student</span>
                                </Label>
                            </div>

                            <div className="flex items-center space-x-3 p-6 rounded-lg border hover:bg-accent/50 cursor-pointer">
                                <RadioGroupItem value="educator" id="educator" />
                                <Label
                                    htmlFor="educator"
                                    className="flex items-center gap-2 cursor-pointer flex-1"
                                >
                                    <span>Educator</span>
                                </Label>
                            </div>
                        </RadioGroup>

                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            type="text"
                            name="firstName"
                            placeholder="Enter first name"
                            value={form.firstName}
                            onChange={handleInputChange}
                        />

                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            type="text"
                            name="lastName"
                            placeholder="Enter last name"
                            value={form.lastName}
                            onChange={handleInputChange}
                        />

                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Email address"
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                        />

                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                name="password"
                                className="pr-10"
                                value={form.password}
                                onChange={handleInputChange}
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
                    </div>

                    <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                        {isLoading ? "Creating User..." : "Create User"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddUserModal;

