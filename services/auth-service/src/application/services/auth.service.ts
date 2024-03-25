import { SignupRequest } from "@application/dto/auth.dto";
import { CreateUserUseCase } from "@application/useCases/createUser";
import { User } from "@domain/entities/auth.entity";
import { IAuthService } from "@domain/interfaces/IAuthService.interface";
import { IUseCase } from "@domain/interfaces/IUseCase";
import { AuthRepository } from "@infrastructure/adapters/database/repository/auth.repository";
import { inject, injectable } from "tsyringe";
// import { SignupResponse } from '@shared/types/requests'
import { CryptographyAdapter } from "@infrastructure/adapters/security/cryptography";
import { EmailAdapter } from "@infrastructure/adapters/external-service/email";
// import { SuccessResponse } from "@application/core/api/api-response";

@injectable()
export class AuthService implements IAuthService {
    private createUserUseCase: IUseCase<SignupRequest, User>;
    private authRepository: AuthRepository;
    private cryptographyAdapter: CryptographyAdapter;
    private emailAdapter: EmailAdapter;
    constructor(
        @inject(CreateUserUseCase) createUserUseCase: IUseCase<SignupRequest, User>,
        @inject(AuthRepository) authRepository: AuthRepository
    ) {
        this.createUserUseCase = createUserUseCase;
        this.authRepository = authRepository;
        this.cryptographyAdapter = new CryptographyAdapter();
        this.emailAdapter = new EmailAdapter();
    }
    async signup(data: SignupRequest): Promise<User> {
        const res = await this.createUserUseCase.execute(data);
        const otp = await this.cryptographyAdapter.generateOtp();
        const expiresAt = new Date(Date.now() + 60000); // 1 minute
        await this.authRepository.createEmailVerificationToken({
            token: otp,
            userId: res.id,
            expiresAt
        });
        this.emailAdapter.sendVerifyEmail(res.email, otp);
        return res
    }
    async deleteUser(id: string): Promise<void> {
        await this.authRepository.deleteUser(id);
    }
}