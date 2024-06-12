import { Role } from "@prisma/client";

class Auth {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: Role,
        
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

export { Auth, User, RefreshToken, ResetToken, EmailVerificationToken };
