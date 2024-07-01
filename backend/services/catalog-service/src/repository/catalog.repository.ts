import { ICatalogRepository } from "@interface/catalog.interface";
import { Product } from "@models/product.model";
import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class CatalogRepository implements ICatalogRepository {

    private _prisma!: PrismaClient;

    constructor() {
        this.intializePrisma()
    }
    private intializePrisma() {
        if (!this._prisma) {
            this._prisma = new PrismaClient()
        }
    }

    async create(product: Product): Promise<Product> {
        return await this._prisma.product.create({
            data: {
                id: String(product.id),
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock
            }
        })
    }

    async findById(id: string): Promise<Product | null> {
        return await this._prisma.product.findFirst({
            where: {
                id: String(id)
            }
        })
    }

    async findAll(limit: number, offset: number): Promise<Product[]> {
        return await this._prisma.product.findMany({
            take: limit,
            skip: offset
        })
    }

    async update(product: Product): Promise<Product> {
        const { id, ...data } = product;
        const cleanData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        );
        const updatedProduct = await this._prisma.product.update({
            where: { id: String(id) },
            data: cleanData
        });
        return updatedProduct as Product;
    }

    async delete(id: string): Promise<{ id: string }> {
        await this._prisma.product.delete({
            where: { id: String(id) }
        });
        return { id };
    }
}