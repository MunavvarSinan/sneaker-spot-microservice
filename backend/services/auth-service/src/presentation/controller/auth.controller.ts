import { NextFunction, Router, Response, Request } from "express";
import { inject, injectable } from "tsyringe";

import { AuthFailureError } from "@application/core/api/api-error";
import { SignupSuccessResponse, SuccessResponse } from "@application/core/api/api-response";
import { RequestValidator } from "@application/core/api/request-validator";
import { LoginRequest, SignupRequest } from "@application/dto/auth.dto";
import { AuthService } from "@application/services/auth.service";
import { TokenService } from "@application/services/token.service";

import { IAuthController } from "@domain/interfaces/IAuthController.interface";

import { clearRefreshTokenCookieConfig, refreshTokenCookieConfig } from "@shared/utils/token-config";
import config from "@shared/config";

@injectable()
export class AuthController implements IAuthController {
    router: Router;

    constructor(
        @inject(AuthService) private authService: AuthService,
        @inject(TokenService) private tokenService: TokenService
    ) {
        this.router = Router();
    }

    /**
     * @param {SignupRequest} req
     * @param Response res
     * @description This method is used to sign up a user
     * @access public
     * @route /sign-up
     * @returns Promise<void>
     */
    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { errors, input } = await RequestValidator(SignupRequest, req.body);
            if (errors) {
                throw new AuthFailureError(errors as string);
            }
            const response = await this.authService.signup(input)
            new SignupSuccessResponse('User created successfully', response).send(res);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @param {Request} req
     * @param Response res
     * @description This method is used to login a user
     * @access public
     * @route /login
     * @returns Promise<void>
     */
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { errors, input } = await RequestValidator(LoginRequest, req.body);
            if (errors) {
                throw new AuthFailureError(errors as string);
            }

            const response = await this.authService.login(input);
            const cookies = req.cookies;
            if (cookies && cookies[config.TOKEN_INFO.refreshTokenName]) {
                const tokenExsists = await this.tokenService.checkRefreshToken(cookies[config.TOKEN_INFO.refreshTokenName], response.user.id as string);
                if (tokenExsists) {
                    await this.tokenService.deleteToken(cookies[config.TOKEN_INFO.refreshTokenName]);
                }
                res.clearCookie(
                    config.TOKEN_INFO.refreshTokenName,
                    clearRefreshTokenCookieConfig
                );
            }

            const accessToken = await this.tokenService.generateAccessToken({ userId: response.user.id as string });
            const refreshToken = await this.tokenService.generateRefreshToken({ userId: response.user.id as string });
            console.log(response.user.id)
            await this.tokenService.saveToken(refreshToken, response.user.id as string);

            res.cookie(
                config.TOKEN_INFO.refreshTokenName,
                refreshToken,
                refreshTokenCookieConfig
            )

            const result = {
                userId: response.user.id,
                accessToken
            }
            new SuccessResponse('User logged in successfully', { ...result }).send(res);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @param {Request} req
     * @param Response res
     * @description This method is used to logout a user
     * @access public
     * @route /logout
     * @returns Promise<void>
     */
    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const cookies = req.cookies;
            if (cookies && cookies[config.TOKEN_INFO.refreshTokenName]) {
                const tokenExsists = await this.tokenService.checkRefreshToken(cookies[config.TOKEN_INFO.refreshTokenName]);
                if (tokenExsists) {
                    await this.tokenService.deleteToken(cookies[config.TOKEN_INFO.refreshTokenName]);
                }
                res.clearCookie(
                    config.TOKEN_INFO.refreshTokenName,
                    clearRefreshTokenCookieConfig
                );
            }
            new SuccessResponse('User logged out successfully', null).send(res);
        } catch (error) {
            next(error);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const cookies = req.cookies;
            if (!cookies || !cookies[config.TOKEN_INFO.refreshTokenName]) {
                throw new AuthFailureError('Unauthorized');
            }
            const token = cookies[config.TOKEN_INFO.refreshTokenName];
            const tokenExists = await this.tokenService.checkRefreshToken(token);

            if (!tokenExists) {
                throw new AuthFailureError('Unauthorized');
            }
            const payload = await this.tokenService.verifyRefreshToken(token);
            const accessTokenPayload = {
                userId: payload.userId,
                role: payload.role
            }
            const accessToken = await this.tokenService.generateAccessToken(accessTokenPayload);
            new SuccessResponse('Token refreshed successfully', { accessToken }).send(res);
        } catch (error) {
            next(error);
        }
    }
    /**
     * @param {Request} req
     * @param Response res
     * @description This method is used to delete a user
     * @access public
     * @route /delete-user
     * @returns Promise<void>
     */
    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.body;
            await this.authService.deleteUser(id);
        } catch (error) {
            next(error);
        }
    }

    async test(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log(req.cookies)
            const cookies = req.cookies;
            const token = cookies[config.TOKEN_INFO.refreshTokenName];
            console.log(token)
            if (!cookies || !cookies[config.TOKEN_INFO.refreshTokenName]) {
                throw new AuthFailureError('Unauthorized');
            }
        } catch (error) {
            next(error);
        }
    }


    routes(): Router {
        this.router.post('/sign-up', this.signup.bind(this));
        this.router.post('/login', this.login.bind(this))
        this.router.post('/logout', this.logout.bind(this));
        this.router.get('/refresh', this.refresh.bind(this));
        this.router.post('/delete-user', this.deleteUser.bind(this));
        this.router.post('/test', this.test.bind(this));
        return this.router;
    }
}