import { OTP } from './otp';
import { CreatePasswordHash } from './createpassword-hash';
import { ComparePassword } from './compare-password';

export class CryptographyAdapter {

    constructor() { }

    async hashPassword(password: string): Promise<string> {
        return CreatePasswordHash.hash(password);
    }
    async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        return ComparePassword.compare(password, hashedPassword);
    }
    async generateOtp(): Promise<string> {
        return OTP.create();
    }
    async verifyOtp(otp: string): Promise<boolean> {
        return OTP.verify(otp);
    }
}