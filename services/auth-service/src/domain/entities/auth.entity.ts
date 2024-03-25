import { Role } from "@prisma/client";

class Auth {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: Role,
        
    ) { }
}

class Account {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly type: string,
        public readonly provider: string,
        public readonly providerAccountId: string,
        public readonly expiresAt: Date,
        public readonly user: User,
        public readonly refresh_token?: string,
        public readonly access_token?: string,
        public readonly token_type?: string,
        public readonly scope?: string,
        public readonly id_token?: string,
        public readonly session_state?: string,
    ) { }
}

class User {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly name: string,
        public readonly passwordHash: string,
        public readonly emailVerified: Date | null,
        public readonly createdAt: Date,
        public readonly role: Role,
        public readonly accounts: Account[],
        public readonly refreshTokens: RefreshToken[],
        public readonly resetTokens: ResetToken[],
        public readonly emailVerificationTokens: EmailVerificationToken[]
    ) { }
}

class RefreshToken {
    constructor(
        public readonly id: string,
        public readonly token: string,
        public readonly user: User,
        public readonly createdAt: Date
    ) { }
}

class ResetToken {
    constructor(
        public readonly id: string,
        public readonly token: string,
        public readonly expiresAt: Date,
        public readonly user: User,
        public readonly createdAt: Date
    ) { }
}

class EmailVerificationToken {
    constructor(
        public readonly id: string,
        public readonly token: string,
        public readonly expiresAt: Date,
        public readonly user: User,
        public readonly createdAt: Date
    ) { }
}

export { Auth, User, Account, RefreshToken, ResetToken, EmailVerificationToken };
