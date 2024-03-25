import { IsNotEmpty, IsString } from 'class-validator';


export class SignupRequest {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    role: string;
    
    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = 'CUSTOMER';
    }
}

export class VerifyEmailRequest {
    @IsString()
    @IsNotEmpty()
    token: string;

    constructor(token: string) {
        this.token = token;
    }
}