import { inject, injectable } from "tsyringe";
import { CreateUserUseCase } from "./createUser";
import { LoginUserUseCase } from "./loginUser";

/**
 * @description This class is used to inject all use cases into the controller
 * @class UseCases
 */

@injectable()
export class UseCases {
    constructor(
        @inject(CreateUserUseCase) private readonly createUserUseCase: CreateUserUseCase,
        @inject(LoginUserUseCase) private readonly loginUserUseCase: LoginUserUseCase,
    ) { }

    get CreateUserUseCase() {
        return this.createUserUseCase
    }

    get LoginUserUseCase() {
        return this.loginUserUseCase
    }
}