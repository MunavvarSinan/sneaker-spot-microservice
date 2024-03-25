import { AuthFailureError } from "@application/core/api/api-error";
import { SuccessResponse } from "@application/core/api/api-response";
import { RequestValidator } from "@application/core/api/request-validator";
import { SignupRequest } from "@application/dto/auth.dto";
import { AuthService } from "@application/services/auth.service";
import { IAuthController } from "@domain/interfaces/IAuthController.interface";
import { NextFunction, Router, Response, Request } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class AuthController implements IAuthController {
    router: Router;
    private authService: AuthService

    constructor(
        @inject(AuthService) authService: AuthService
    ) {
        this.router = Router();
        this.authService = authService;
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
            const { id } = await this.authService.signup(input)
            new SuccessResponse('User created successfully', id).send(res);
        } catch (error) {
            next(error);
        }
    }
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
        this.router.post('/delete-user', this.deleteUser.bind(this));
        return this.router;
    }
}