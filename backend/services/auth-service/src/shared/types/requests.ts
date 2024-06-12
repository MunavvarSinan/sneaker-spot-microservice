export interface SignupRequestInterace {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string
}
// export interface SignupResponse {
//     statusCode: number;
//     accessToken: string;
// }

export interface EmailVerificationToken {
    token: string;
    expiresAt: Date;
    userId: string;
}

export interface SignupResponse {
    message: string;
    user: {
        id: string;
    };
}

export interface LoginResponse {
    message: string;
    user: {
        id: string;
        accessToken: string;
    };
}