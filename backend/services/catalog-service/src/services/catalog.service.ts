import { TYPES } from "@infrastructure/adapters/inversify/types";
import { ICatalogRepository } from "@interface/catalog.interface";
import { Product } from "@models/product.model";
import { NotFoundError } from "@utils/errors";
import { generateId } from "@utils/generate-id";
import { inject, injectable } from "inversify";

@injectable()
export class CatalogService {
    constructor(
        @inject(TYPES.ICatalogRepository) private repository: ICatalogRepository
    ) { }

    public async createProduct(input: Product) {
        const id = generateId.generate();
        input = { ...input, id };
        const data = await this.repository.create(input);
        if (!data.id) {
            throw new Error("Unable to create product");
        }
        return data;
    }
    public async updateProduct(input: Partial<Product>) {
        const data = await this.repository.update(input);
        if (!data.id) {
            throw new Error("Unable to update product");
        }
        return data;
    }
    public async deleteProduct(id: string) {
        const product = await this.repository.delete(id);
        if (!product) {
            throw new Error("Unable to delete product");
        }
        return product
    }
    public async getProducts(limit: number, offset: number) {
        const products = await this.repository.findAll(limit, offset);
        return products;
    }
    public async getProduct(id: string) {
        const product = await this.repository.findById(id);
        if (!product) {
            throw new NotFoundError("Product not found");
        }
        return product;
    }
}