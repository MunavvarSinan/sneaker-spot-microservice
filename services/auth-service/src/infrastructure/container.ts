import { container } from 'tsyringe'

import { AuthRepository } from '@infrastructure/adapters/database/repository/auth.repository'
import { AuthController } from '@presentation/controller/auth.controller'
import { AuthService } from '@application/services/auth.service'
import { CreateUserUseCase } from '@application/useCases/createUser'
import { CryptographyAdapter } from './adapters/security/cryptography'
import { EmailController } from '@presentation/controller/email.controller'
import { UseCases } from '@application/useCases'

container.register(AuthService, {
    useClass: AuthService
})

container.register(AuthController, {
    useClass: AuthController
})

container.register(AuthRepository, {
    useClass: AuthRepository
})

container.register(CreateUserUseCase, {
    useClass: CreateUserUseCase
})

container.register(CryptographyAdapter, {
    useClass: CryptographyAdapter
})


container.register(EmailController, {
    useClass: EmailController
})

container.register(UseCases, {
    useClass: UseCases
})