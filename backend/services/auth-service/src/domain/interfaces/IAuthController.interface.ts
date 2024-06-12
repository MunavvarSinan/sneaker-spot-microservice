import { SignupRequest } from "@application/dto/auth.dto";
import { NextFunction, Response } from "express";

export interface IAuthController {
    signup(req: TypedRequest<SignupRequest>, res: Response, next: NextFunction): Promise<void>;
}