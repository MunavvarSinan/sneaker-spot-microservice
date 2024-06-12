// import { JwtPayload } from "jsonwebtoken";

export interface ITokenService {
    checkRefreshToken(refreshToken: string, userId: string): Promise<boolean>;
    generateAccessToken(payload: { userId: string, role?: string }): Promise<string>;
    generateRefreshToken(payload: { userId: string, role?: string }): Promise<string>;
    // verifyAccessToken(token: string): Promise<string>;
    // verifyRefreshToken(token: string): Promise<string>;
    // deleteToken(refreshToken: string): Promise<void>;
}