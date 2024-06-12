import { SecurityError } from "@application/core/api/api-error";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);


interface CreatePasswordHash {
    hash: (password: string) => Promise<string>;
}

export const CreatePasswordHash: CreatePasswordHash = {
    hash: async (password) => {
        try {
            const salt = randomBytes(8).toString('hex');
            const buf = (await scryptAsync(password, salt, 64)) as Buffer;
            return `${buf.toString('hex')}.${salt}`;
        } catch (error) {
            throw new SecurityError('Error hashing password');
        }
    }
}

