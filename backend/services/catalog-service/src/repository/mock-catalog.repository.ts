import { ICatalogRepository } from "@interface/catalog.interface";
import { Product } from "@models/product.model";
import { injectable } from "inversify";

@injectable()
export class MockCatalogRepository implements ICatalogRepository {
    create(data: Product): Promise<Product> {
        const mockProduct = {
            id: 334,
            ...data
        } as Product;
        return Promise.resolve(mockProduct);
    }
    update(data: Product): Promise<Product> {
        return Promise.resolve(data as unknown as Product);
    }
    delete(id: string): Promise<{ id: string }> {
        return Promise.resolve({ id });
    }
    findAll(limit: number, offset: number): Promise<Product[]> {
        return Promise.resolve([]);
    }
    findById(id: string): Promise<Product> {
        return Promise.resolve({ id } as unknown as Product);
    }
}