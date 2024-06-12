import { CryptographyAdapter } from './cryptography';

export class SecurityAdapter {
    private cryptographyAdapter: CryptographyAdapter;

    constructor() {
        this.cryptographyAdapter = new CryptographyAdapter();
    }
    async hashPassword(password: string): Promise<string> {
        return this.cryptographyAdapter.hashPassword(password);
    }
    async generateOtp(): Promise<string> {
        return this.cryptographyAdapter.generateOtp();
    }
    async verifyOtp(otp: string): Promise<boolean> {
        return this.cryptographyAdapter.verifyOtp(otp);
    }
}