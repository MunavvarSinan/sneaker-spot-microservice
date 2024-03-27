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
}