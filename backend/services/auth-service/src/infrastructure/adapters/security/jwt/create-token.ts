import { sign } from 'jsonwebtoken';

import config from '@shared/config';


interface CreateTokenInterface {
    accessToken: (userId: string | number, role?: string) => string;
    refreshToken: (userId: string | number, role?: string) => string;
}

const expiresIn = Math.floor(Date.now() / 1000) + 15; // Set expiresIn to 15 seconds



export const CreateToken: CreateTokenInterface = {
    /**
     * This functions generates a valid access token
     *
     * @param {number | string} userId - The user id of the user that owns this jwt
     * @returns Returns a valid access token
    */
    accessToken: (userId: string | number, role?: string) => {
        return sign({ userId, role }, config.TOKEN_INFO.accessTokenSecret, {
            expiresIn: expiresIn,
            // expiresIn: Math.floor(Date.now() / 1000) + (config.TOKEN_INFO.accessTokenValidityDays * 24 * 60 * 60),
            issuer: config.TOKEN_INFO.issuer,
            subject: userId.toString(),
        });
    },

    /**
     * This functions generates a valid refresh token
     *
     * @param {number | string} userId - The user id of the user that owns this jwt
     * @returns Returns a valid refresh token
    */
    refreshToken: (userId: string | number, role?: string) => {
        return sign({ userId, role }, config.TOKEN_INFO.refreshTokenSecret, {
            expiresIn: Math.floor(Date.now() / 1000) + (config.TOKEN_INFO.refreshTokenValidityDays * 24 * 60 * 60),
            issuer: config.TOKEN_INFO.issuer,
            subject: userId.toString(),
        });
    }
}