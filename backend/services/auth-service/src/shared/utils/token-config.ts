import { CookieOptions } from "express";

export const refreshTokenCookieConfig: CookieOptions = {
    httpOnly: false,
    sameSite: 'strict',
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
    path: '/'
};

export const clearRefreshTokenCookieConfig: CookieOptions = {
    httpOnly: true,
    sameSite: 'none',
    secure: true
};
