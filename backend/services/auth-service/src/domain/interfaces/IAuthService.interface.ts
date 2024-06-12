import { LoginRequest } from "@application/dto/auth.dto";
import { LoginResponse, SignupRequestInterace, SignupResponse } from "@shared/types/requests";

export interface IAuthService {
    signup(data: SignupRequestInterace): Promise<SignupResponse>;
    login(data: LoginRequest): Promise<LoginResponse>;
}