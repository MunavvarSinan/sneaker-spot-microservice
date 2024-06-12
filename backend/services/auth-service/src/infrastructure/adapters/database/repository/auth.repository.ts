
import { User } from "@domain/entities/auth.entity";
import { PrismaClient, Role } from "@prisma/client";
import { EmailVerificationToken, SignupRequestInterace } from "@shared/types/requests";
import { injectable } from "tsyringe";

@injectable()
export class AuthRepository {
    private prisma!: PrismaClient;

    constructor() {
        this.intializePrisma()
    }
    private intializePrisma() {
        if (!this.prisma) {
            this.prisma = new PrismaClient()
        }
    }
    async findUserByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findFirst({
            where: {
                email
            }
        })
    }

    async findUserById(id: string): Promise<User | null> {
        return await this.prisma.user.findFirst({
            where: {
                id
            }
        })
    }

    async create(data: SignupRequestInterace): Promise<User> {
        return await this.prisma.user.create({
            data: {
                id: data.id,
                email: data.email,
                name: data.name,
                passwordHash: data.password,
                role: data.role as Role || undefined
            }
        })
    }
    async createEmailVerificationToken(data: EmailVerificationToken): Promise<EmailVerificationToken> {
        return await this.prisma.emailVerificationToken.create({
            data: {
                token: data.token,
                userId: data.userId,
                expiresAt: data.expiresAt
            }
        })
    }
    async deleteUser(id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }

        await this.prisma.emailVerificationToken.deleteMany({ where: { userId: user.id } });
        const deletedUser = await this.prisma.user.delete({ where: { id } });
        return deletedUser;
    }
    async findEmailVerificationToken(token: string): Promise<EmailVerificationToken | null> {
        const emailVerificationToken = await this.prisma.emailVerificationToken.findFirst({
            where: {
                token
            }
        })

        return emailVerificationToken
    }
    async updateUser(id: string, data: Partial<User>): Promise<User> {
        return await this.prisma.user.update({
            where: {
                id
            },
            data: {
                email: data.email,
                name: data.name,
                passwordHash: data.passwordHash,
                emailVerified: data.emailVerified,
                role: data.role
            }
        })
    }

    async deleteEmailVerificationToken(token: string): Promise<EmailVerificationToken> {
        const emailVerificationToken = await this.prisma.emailVerificationToken.delete({
            where: {
                token
            }
        })

        return emailVerificationToken
    }
    async findRefreshToken(token: string, userId?: string): Promise<User | null> {
        return await this.prisma.refreshToken.findFirst({
            where: {
                token,
                userId
            }
        })

    }
    async saveRefreshToken(token: string, userId: string): Promise<void> {
        await this.prisma.refreshToken.create({
            data: {
                token,
                userId
            }
        })
    }

    async deleteToken(token: string, userId?: string): Promise<void> {
        await this.prisma.refreshToken.delete({
            where: {
                token,
                userId: userId || undefined
            }
        })
    }

}