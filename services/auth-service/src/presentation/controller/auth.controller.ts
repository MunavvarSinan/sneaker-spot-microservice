import { AuthFailureError } from "@application/core/api/api-error";
import { SignupSuccessResponse, SuccessResponse } from "@application/core/api/api-response";
import { RequestValidator } from "@application/core/api/request-validator";
import { LoginRequest, SignupRequest } from "@application/dto/auth.dto";
import { AuthService } from "@application/services/auth.service";
import { IAuthController } from "@domain/interfaces/IAuthController.interface";
import { NextFunction, Router, Response, Request } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class AuthController implements IAuthController {
    router: Router;

    constructor(
        @inject(AuthService) private authService: AuthService
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
            new SuccessResponse('User logged in successfully', response).send(res);
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
            new SuccessResponse('User deleted successfully', null).send(res);
        } catch (error) {
            next(error);
        }
    }


    routes(): Router {
        this.router.post('/sign-up', this.signup.bind(this));
        this.router.post('/login', this.login.bind(this))
        this.router.post('/delete-user', this.deleteUser.bind(this));
        return this.router;
    }
}