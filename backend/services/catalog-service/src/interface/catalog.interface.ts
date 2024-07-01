import { Product } from "@models/product.model"

export interface ICatalogRepository {
    create(data: any): Promise<Product>
    update(data: any): Promise<Partial<Product>>
    delete(id: string): Promise<{ id: string }>
    findAll(limit: number, offset: number): Promise<Product[]>
    findById(id: string): Promise<Product | null>
}