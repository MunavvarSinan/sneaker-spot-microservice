import { User } from "@domain/entities/auth.entity";
import { SignupRequestInterace } from "@shared/types/requests";

export interface IAuthRepository {
    create(data: SignupRequestInterace): Promise<User>;
}