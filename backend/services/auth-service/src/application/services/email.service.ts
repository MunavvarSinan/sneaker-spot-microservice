import { AuthRepository } from "@infrastructure/adapters/database/repository/auth.repository";
import { inject, injectable } from "tsyringe";
import { AuthFailureError } from "@application/core/api/api-error";
import { CryptographyAdapter } from "@infrastructure/adapters/security/cryptography";

@injectable()
export class EmailService {
    private authRepository: AuthRepository;
    private cryptographyAdapter: CryptographyAdapter;
    constructor(
        @inject(AuthRepository) authRepository: AuthRepository
    ) {
        this.authRepository = authRepository;
        this.cryptographyAdapter = new CryptographyAdapter();
    }
    async verifyToken(token: string): Promise<void> {
        const verificationToken = await this.authRepository.findEmailVerificationToken(token);

        if (!verificationToken || verificationToken.expiresAt < new Date()) {
            throw new AuthFailureError('Invalid or expired token');
        }
        const isVerified = this.cryptographyAdapter.verifyOtp(token);
        if (!isVerified) {
            throw new AuthFailureError('Invalid token');
        }
        await this.authRepository.updateUser(verificationToken.userId, { emailVerified: new Date() });
        await this.authRepository.deleteEmailVerificationToken(token);
        return
    }
}