import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class CreateProductRequest {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    @IsNumber()
    stock: number

    constructor(name: string, description: string, price: number, stock: number) {
        this.name = name;
        this.description = description
        this.price = price;
        this.stock = stock;
    }
}

export class UpdateProductRequest {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    price?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    stock?: number;
}