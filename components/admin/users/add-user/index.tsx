"use client"
import { useState, useRef, type ChangeEvent, type FormEvent } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { SignupFormType, UserRole } from "@/lib/types"
import { signUp } from "@/store/actions/auth-action"
import SimpleReactValidator from "simple-react-validator"
import { DEFAULT_TIMEZONE, strongRegex, USER_CREATION_MESSAGES, adminRoleList } from "@/components/admin/constant"
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
        validator.current.showMessageFor(event.target.name)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
         
        if (validator.current.allValid()) {
            setIsLoading(true)
            const res = await signUp(form)
            setIsLoading(false);
            
            console.log(res, "Responsive");

            if (res?.signUp?.success) {
                toast({
                    title: USER_CREATION_MESSAGES.TOAST_SUCCESS_TITLE,
                    description: USER_CREATION_MESSAGES.TOAST_SUCCESS_DESCRIPTION,
                })
                setForm(defaultSignupForm)
                validator.current.hideMessages()
                setForceUpdate(forceUpdate + 1)
                onOpenChange(false)
                onUserCreated?.()
            } else {
                toast({
                    title: USER_CREATION_MESSAGES.TOAST_ERROR_TITLE,
                    description: res?.message || USER_CREATION_MESSAGES.TOAST_ERROR_DESCRIPTION,
                })
            }
        } else {
            validator.current.showMessages()
            setForceUpdate(forceUpdate + 1)
        }
        setIsLoading(false)
    }

    const handleClose = () => {
        setForm(defaultSignupForm)
        setShowPassword(false)
        validator.current.hideMessages()
        setForceUpdate(forceUpdate + 1)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto" onInteractOutside={e => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{USER_CREATION_MESSAGES.DIALOG_TITLE}</DialogTitle>
                    <DialogDescription>{USER_CREATION_MESSAGES.DIALOG_DESCRIPTION}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-6">
                        <Label></Label>
                        <RadioGroup
                            value={form.role.toLowerCase()}
                            onValueChange={(value) => {
                                setForm({ ...form, role: value.toUpperCase() as UserRole })
                            }}
                            className="grid grid-cols-2 gap-6"
                        >
                            {adminRoleList.map((roleOption) => (
                                <div
                                    key={roleOption.value}
                                    className="flex items-center space-x-3 p-6 rounded-lg border hover:bg-accent/50 cursor-pointer"
                                >
                                    <RadioGroupItem value={roleOption.value} id={roleOption.value} />
                                    <Label
                                        htmlFor={roleOption.value}
                                        className="flex items-center gap-2 cursor-pointer flex-1"
                                    >
                                        {roleOption.icon}
                                        <span>{roleOption.label}</span>
                                    </Label>
                                </div>
                            ))}
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
                        <div className="text-red-500 text-sm">
                            {validator.current.message("firstName", form.firstName, "required|min:3")}
                        </div>
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
                        <div className="text-red-500 text-sm">
                            {validator.current.message("lastName", form.lastName, "required|min:3")}
                        </div>
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
                        <div className="text-red-500 text-sm">
                            {validator.current.message("email", form.email, "required|email")}
                        </div>
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
                        <div className="text-red-500 text-sm">
                            {validator.current.message("password", form.password, "required|strong_password")}
                        </div>
                    </div>

                    <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                        {isLoading ? USER_CREATION_MESSAGES.BUTTON_CREATING_ACCOUNT : USER_CREATION_MESSAGES.BUTTON_CREATE_ACCOUNT}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddUserModal;

