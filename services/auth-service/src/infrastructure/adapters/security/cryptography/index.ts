import { CreatePasswordHash } from '@infrastructure/adapters/security/cryptography/createpassword-hash';
import { OTP } from './otp';
// import { CreatePasswordHash } from './createpassword-hash';

export class CryptographyAdapter {
    private createPasswordHash: typeof CreatePasswordHash;
    private createOtp: typeof OTP;

    constructor() {
        this.createPasswordHash = CreatePasswordHash;
        this.createOtp = OTP;
    }
    async hashPassword(password: string): Promise<string> {
        return this.createPasswordHash.hash(password);
    }
    async generateOtp(): Promise<string> {
        return this.createOtp.create();
    }
    async verifyOtp(otp: string): Promise<boolean> {
        return this.createOtp.verify(otp);
    }
}