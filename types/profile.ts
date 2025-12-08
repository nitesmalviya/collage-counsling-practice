export interface ChangePasswordType {
    currentPassword: string;
    newPassword: string;
    confirmPassword?: string;
}

export interface UpdateUserType {
    updateUserId: string;
    first_name: string;
    last_name: string;
    phone: string;
    fileUploadPath?: string;
    email: string;
    role: string;
    avatar_path: string;
}

