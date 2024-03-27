import { User } from "@domain/entities/auth.entity";
import { IUseCase } from "@domain/interfaces/IUseCase";
import { AuthRepository } from "@infrastructure/adapters/database/repository/auth.repository";
import { AuthFailureError } from "@application/core/api/api-error";
import { CryptographyAdapter } from "@infrastructure/adapters/security/cryptography";
import { inject, injectable } from "tsyringe";
import { SignupRequest } from "@application/dto/auth.dto";
import { generateId } from "@shared/utils/generate-id";

/**
 * @description This class is used to create a user
 * @class CreateUserUseCase
 * @implements IUseCase<SignupRequest, User>
 * @param {AuthRepository} authRepository
 * @param {CryptographyAdapter} cryptographyAdapter
 * @returns {Promise<User>}
 * @throws {AuthFailureError}
 * @example CreateUserUseCase.execute(data)
 */

@injectable()
export class CreateUserUseCase implements IUseCase<SignupRequest, User> {
    constructor(
        @inject(AuthRepository) private readonly authRepository: AuthRepository,
        @inject(CryptographyAdapter) private readonly cryptographyAdapter: CryptographyAdapter
    ) { }

    async execute(input: SignupRequest): Promise<User> {
        const user = await this.authRepository.findUserByEmail(input.email);
        console.log(user);
        if (user && user.emailVerified === null) {
            await this.authRepository.deleteUser(user.id);
        } else if (user) {
            throw new AuthFailureError('User already exists');
        }
        
        const id = generateId.generate();
        input.password = await this.cryptographyAdapter.hashPassword(input.password);
        const data = { ...input, id };
        return this.authRepository.create(data);
    }
}
