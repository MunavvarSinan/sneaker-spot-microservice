import { User } from "@domain/entities/auth.entity";
import { SignupRequestInterace } from "@shared/types/requests";

export interface IAuthService {
    signup(data: SignupRequestInterace): Promise<User>;
}