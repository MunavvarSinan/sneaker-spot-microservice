import { SecurityError } from '@application/core/api/api-error';
import speakeasy from 'speakeasy';

const secret = speakeasy.generateSecret({ length: 20 });

interface OTP {
    create: () => string;
    verify: (otp: string) => boolean;
}
export const OTP: OTP = {
    create: (): string => {
        try {
            return speakeasy.totp({
                secret: secret.base32,
                encoding: 'base32',
                step: 30, // Adjust step size for time synchronization tolerance
                digits: 6,
            });
        } catch (err) {
            throw new SecurityError('Error generating OTP');
        }
    },
    verify: (otp: string): boolean => {
        try {
            return speakeasy.totp.verify({
                secret: secret.base32,
                encoding: 'base32',
                token: otp,
                step: 30,
                digits: 6,
            });
        } catch (err) {
            throw new SecurityError('Error verifying OTP');
        }
    }
}