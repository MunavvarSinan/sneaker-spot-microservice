import { JwtPayload } from "jsonwebtoken";
import { CreateToken } from "./create-token";
import { VerifyToken } from "./verify";
import { SecurityError } from "@application/core/api/api-error";

export class JWTAdapter {
    constructor() { }

    async signAccessToken(payload: { userId: string, role?: string }): Promise<string> {
        try {
            return CreateToken.accessToken(payload.userId, payload.role);
        } catch (error) {
            throw new SecurityError('Error signing access token');
        }
    }
    async signRefreshToken(payload: { userId: string, role?: string }): Promise<string> {
        try {
            return CreateToken.refreshToken(payload.userId, payload.role);
        } catch (error) {
            throw new SecurityError('Error signing refresh token');
        }
    }
    async verify(token: string, secret: string): Promise<JwtPayload> {
        try {
            return VerifyToken.verify(token, secret);
        } catch (error) {
            throw new SecurityError('Error validating token');
        }
    }
}