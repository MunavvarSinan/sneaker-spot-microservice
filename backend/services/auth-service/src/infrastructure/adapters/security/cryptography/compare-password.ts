import { SecurityError } from "@application/core/api/api-error";
import { scrypt } from "crypto";
import { promisify } from "util";

interface ComparePassword {
    compare: (password: string, hashedPassword: string) => Promise<boolean>;
}

const scryptAsync = promisify(scrypt);


export const ComparePassword: ComparePassword = {
    compare: async (password, hashedPassword) => {
        try {
            const [storedHash, storedSalt] = hashedPassword.split('.');
            const buf = (await scryptAsync(password, storedSalt, 64)) as Buffer;
            return buf.toString('hex') === storedHash;
        } catch (error) {
            throw new SecurityError('Invalid password');
        }
    }
}