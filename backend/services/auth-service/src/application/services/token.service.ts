import { TokenError } from "@application/core/api/api-error";
import { ITokenService } from "@domain/interfaces/ITokenService.interface";
import { AuthRepository } from "@infrastructure/adapters/database/repository/auth.repository";
import { JWTAdapter } from "@infrastructure/adapters/security/jwt";
import config from "@shared/config";
import { JwtPayload } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

@injectable()
export class TokenService implements ITokenService {
    constructor(
        @inject(AuthRepository) private authRepository: AuthRepository,
        @inject(JWTAdapter) private jwtAdapter: JWTAdapter
    ) { }

    /**
         * @param {string} refreshToken
         * @description This method is used to check if a refresh token is valid
         * @access public
         * @returns Promise<boolean>
         * @memberof TokenService
         * @implements ITokenService
         * @method checkRefreshToken
     
    */
    async checkRefreshToken(refreshToken: string, userId?: string): Promise<boolean> {
        try {
            const token = await this.authRepository.findRefreshToken(refreshToken, userId);
            if (!token) {
                return false;
            }
            return true
        } catch (error) {
            throw new TokenError('Invalid refresh token');
        }
    }

    /**generateAccessToken
     * @param {string} userId
     * @description This method is used to generate a refresh token
     * @access public
     * @returns Promise<string>
     * @memberof TokenService
     * @implements ITokenService
     * @method generateAccessToken
     */

    async generateAccessToken(payload: { userId: string, role?: string }): Promise<string> {
        try {
            return await this.jwtAdapter.signAccessToken(payload);

        } catch (error) {
            throw new TokenError('Error generating access token');
        }
    }

    /**
     * @param {string} userId
     * @description This method is used to generate a refresh token
     * @access public
     * @returns Promise<string>
     * @memberof TokenService
     * @implements ITokenService
     * @method generateRefreshToken
     */
    async generateRefreshToken(payload: { userId: string, role?: string }): Promise<string> {
        try {
            return await this.jwtAdapter.signRefreshToken(payload);

        } catch (error) {
            throw new TokenError('Error generating refresh token');
        }
    }

    async verifyRefreshToken(token: string): Promise<JwtPayload> {
        try {
            return await this.jwtAdapter.verify(token, config.TOKEN_INFO.refreshTokenSecret);

        } catch (error) {
            throw new TokenError('Error verifying token');
        }
    }
    /**
     * @param {string} token
     * @description This method is used to save a refresh token
     * @access public
     * @returns Promise<void>
     * @memberof TokenService
     * @implements ITokenService
     * @method saveToken
     */
    async saveToken(token: string, userId: string): Promise<void> {
        try {
            const tokenSaved = await this.authRepository.saveRefreshToken(token, userId);
            console.log({ tokenSaved })
            return tokenSaved;
        } catch (error) {
            throw new TokenError('Error saving token');
        }
    }

    /**
     * @param {string} token
     * @param {string} userId
     * @description This method is used to delete a refresh token
     * @access public
     * @returns Promise<void>
     * @memberof TokenService
     * @implements ITokenService
     * @method deleteToken
     */
    async deleteToken(token: string, userId?: string): Promise<void> {
        try {
            await this.authRepository.deleteToken(token, userId);

        } catch (error) {
            throw new TokenError('Error deleting token');
        }
    }
} 
