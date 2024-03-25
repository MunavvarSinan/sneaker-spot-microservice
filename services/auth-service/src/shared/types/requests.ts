export interface SignupRequestInterace {
    id:string;
    name: string;
    email: string;
    password: string;
    role: string
}
export interface SignupResponse {
    statusCode: number;
    accessToken: string;
}

export interface EmailVerificationToken {
    token: string;
    expiresAt: Date;
    userId: string;
}
