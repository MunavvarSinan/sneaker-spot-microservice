import { inject, injectable } from "tsyringe";

import { LoginRequest, SignupRequest } from "@application/dto/auth.dto";

import { IAuthService } from "@domain/interfaces/IAuthService.interface";

import { AuthRepository } from "@infrastructure/adapters/database/repository/auth.repository";
import { EmailAdapter } from "@infrastructure/adapters/external-service/email";
import { SecurityAdapter } from "@infrastructure/adapters/security";

import { AuthPresenter } from "@presentation/presenters/auth.presenter";

import { UseCases } from "@application/useCases";
import { LoginResponse, SignupResponse } from "@shared/types/requests";

@injectable()
export class AuthService implements IAuthService {
    private securityAdapter: SecurityAdapter;
    private emailAdapter: EmailAdapter;
    private authPresenter: AuthPresenter

    constructor(
        @inject(AuthRepository) private authRepository: AuthRepository,
        @inject(UseCases) private useCases: UseCases
    ) {
        this.securityAdapter = new SecurityAdapter();
        this.emailAdapter = new EmailAdapter();
        this.authPresenter = new AuthPresenter();
    }
    /**
     * @param {SignupRequest} data
     * @description This method is used to sign up a user
     * @access public
     * @returns Promise<SignupResponse>
     */
    async signup(data: SignupRequest): Promise<SignupResponse> {
        const res = await this.useCases.CreateUserUseCase.execute(data);
        const otp = await this.securityAdapter.generateOtp();
        const expiresAt = new Date(Date.now() + 60000); // 1 minute
        await this.authRepository.createEmailVerificationToken({
            token: otp,
            userId: res.id,
            expiresAt
        });
        this.emailAdapter.sendVerifyEmail(res.email, otp);
        const response = this.authPresenter.SignupSuccessResponse(res);
        return response
    }

    /**
     * @param {LoginRequest} data
     * @description This method is used to login a user
     * @access public
     * @returns Promise<void>
     */
    async login(data: LoginRequest): Promise<LoginResponse> {
        const user = await this.useCases.LoginUserUseCase.execute(data);
        console.log(user);
        throw new Error("Method not implemented.");
    }

    /**
     * @param {string} id
     * @description This method is used to delete a user
     * @access public
     * @returns Promise<void>
     */
    async deleteUser(id: string): Promise<void> {
        await this.authRepository.deleteUser(id);
    }
}