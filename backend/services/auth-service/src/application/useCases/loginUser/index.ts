import { IUseCase } from "@domain/interfaces/IUseCase";
import { AuthRepository } from "@infrastructure/adapters/database/repository/auth.repository";
import { AuthFailureError, SecurityError } from "@application/core/api/api-error";
import { CryptographyAdapter } from "@infrastructure/adapters/security/cryptography";
import { inject, injectable } from "tsyringe";
import { LoginRequest } from "@application/dto/auth.dto";
import { User } from "@domain/entities/auth.entity";

/**
 * @description This class is used to login a user
 * @class LoginUserUseCase
 * @implements IUseCase<LoginRequest, User>
 * @param {AuthRepository} authRepository
 * @param {CryptographyAdapter} cryptographyAdapter
 * @returns {Promise<User>}
 * @throws {AuthFailureError}
 * @example LoginUserUseCase.execute(data)
 */


@injectable()
export class LoginUserUseCase implements IUseCase<LoginRequest, User> {
    constructor(
        @inject(AuthRepository) private readonly authRepository: AuthRepository,
        @inject(CryptographyAdapter) private readonly cryptographyAdapter: CryptographyAdapter
    ) { }

    async execute(input: LoginRequest): Promise<User> {
        const user = await this.authRepository.findUserByEmail(input.email);
        if (!user || !user.emailVerified) {
            throw new AuthFailureError('User not found or email not verified');
        }
        const isPasswordValid = await this.cryptographyAdapter.verifyPassword(input.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new SecurityError('Invalid password');
        }
        return user;
    }
}
