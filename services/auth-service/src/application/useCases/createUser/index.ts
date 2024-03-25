import { User } from "@domain/entities/auth.entity";
import { IUseCase } from "@domain/interfaces/IUseCase";
import { AuthRepository } from "@infrastructure/adapters/database/repository/auth.repository";
import { AuthFailureError } from "@application/core/api/api-error";
import { CryptographyAdapter } from "@infrastructure/adapters/security/cryptography";
import { injectable } from "tsyringe";
import { SignupRequest } from "@application/dto/auth.dto";
import { generateId } from "@shared/utils/generate-id";

@injectable()
export class CreateUserUseCase implements IUseCase<SignupRequest, User> {
    public readonly cryptographyAdapter: CryptographyAdapter
    constructor(private readonly authRepository: AuthRepository,
    ) {
        this.cryptographyAdapter = new CryptographyAdapter();
    }

    async execute(input: SignupRequest): Promise<User> {
        const userExists = await this.authRepository.findUserByEmail(input.email);
        const id = generateId.generate();
        if (userExists) {
            throw new AuthFailureError('User already exists');
        }
        input.password = await this.cryptographyAdapter.hashPassword(input.password);
        const data = { ...input, id };
        return this.authRepository.create(data);
    }
}
