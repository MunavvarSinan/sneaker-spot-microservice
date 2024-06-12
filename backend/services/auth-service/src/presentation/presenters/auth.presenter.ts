import { User } from "@domain/entities/auth.entity";

export class AuthPresenter {
    public SignupSuccessResponse(user: User) {
        return {
            message: 'User created successfully ( check your email to verify your account )',
            user: {
                id: user.id,
            }
        }
    }
    public LoginSuccessResponse(user: User, accessToken: string) {
        return {
            message: 'User logged in successfully',
            user: {
                id: user.id,
                accessToken: accessToken
            }
        }
    }
}