import { AuthFailureError } from "@application/core/api/api-error";
import { SuccessResponse } from "@application/core/api/api-response";
import { RequestValidator } from "@application/core/api/request-validator";
import { VerifyEmailRequest } from "@application/dto/auth.dto";
import { EmailService } from "@application/services/email.service";
import { NextFunction, Router, Response, Request } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class EmailController {
    router: Router;
    private emailService: EmailService

    constructor(
        @inject(EmailService) emailService: EmailService
    ) {
        this.router = Router();
        this.emailService = emailService;
    }

    async verifyEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { errors, input } = await RequestValidator(VerifyEmailRequest, req.params);
            if (errors) {
                throw new AuthFailureError('Invalid token');
            }
            await this.emailService.verifyToken(input.token);
            new SuccessResponse('Email verified successfully', null).send(res);
        } catch (error) {
            next(error);
        }
    }

    routes(): Router {
        this.router.post('/verify-email/:token', this.verifyEmail.bind(this));
        return this.router;
    }
}