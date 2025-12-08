export type AuthState = {
    token: string | null;
    refresh_token: string;
    user: any;
}

export type LoginRes = {
    access_token: string
    user: any,
    refresh_token: string;
}

export type RefreshTokenRes = {
    refreshToken: {
        accessToken: string;
        message: string;
        refreshToken: string | null;
        success: boolean;
    }
}