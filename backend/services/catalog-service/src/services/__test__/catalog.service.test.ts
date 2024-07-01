import { ICatalogRepository } from "@interface/catalog.interface";

import { CatalogService } from "@services/catalog.service";
import { faker } from "@faker-js/faker"
import { MockCatalogRepository } from "@repository/mock-catalog.repository";
import { Container } from "inversify";
import { TYPES } from "@infrastructure/adapters/inversify/types";
import { ProductFactory } from '@utils/fixtures'

const mockProduct = (data?: any) => {
    return {
        ...data,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: String(faker.commerce.price()),
        stock: faker.number.int({ min: 10, max: 100 })
    }
}


// describe() is used to group the tests
describe("catalogService", () => {
    let service: CatalogService;
    const container = new Container();

    beforeAll(() => {
        container.bind<ICatalogRepository>(TYPES.ICatalogRepository).to(MockCatalogRepository);
        container.bind<CatalogService>(CatalogService).toSelf();
        service = container.get<CatalogService>(CatalogService);
    })

    afterAll(() => {
        container.unbindAll();
    })

    describe("createProduct", () => {
        test("should create a product", async () => {
            const reqBody = ProductFactory.build();
            const result = await service.createProduct(reqBody);
            expect(result).toMatchObject({
                id: expect.any(String),
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
            })
        })

        test("should throw an error with unable to create product", async () => {
            const reqBody = mockProduct();
            jest.spyOn(MockCatalogRepository.prototype, 'create').mockImplementationOnce(() => {
                return Promise.reject(new Error("Unable to create product"));
            });
            await expect(service.createProduct(reqBody)).rejects.toThrow(
                "Unable to create product"
            )
        })

        test("should throw an error with product already exists", async () => {
            const reqBody = mockProduct({
                id: faker.number.int()
            });
            jest.spyOn(MockCatalogRepository.prototype, 'create').mockImplementationOnce(() => {
                throw new Error("Product already exists")
            })
            await expect(service.createProduct(reqBody)).rejects.toThrow("Product already exists")
        })
    })

    describe("updateProduct", () => {
        test("should update a product", async () => {
            const reqBody = mockProduct({
                id: faker.number.int()
            });
            const result = await service.updateProduct(reqBody);
            expect(result).toMatchObject(reqBody)
        })
        test("should throw an error with product does not exists", async () => {
            const reqBody = mockProduct();
            jest.spyOn(MockCatalogRepository.prototype, 'update').mockImplementationOnce(() => {
                throw new Error("Product does not exists")
            })
            await expect(service.updateProduct(reqBody)).rejects.toThrow("Product does not exists")
        })
    })

    describe("getProducts", () => {
        test("should get products by offset and limit", async () => {
            const randomLimit = faker.number.int({ min: 10, max: 50 });
            const products = ProductFactory.buildList(randomLimit)

            jest.spyOn(MockCatalogRepository.prototype, 'findAll').mockImplementationOnce(() => Promise.resolve(products))

            const result = await service.getProducts(randomLimit, 0);
            expect(result.length).toEqual(randomLimit);
            expect(result).toEqual(products)
        })
        test("should throw an error with no products found", async () => {
            jest.spyOn(MockCatalogRepository.prototype, 'findAll').mockImplementationOnce(() => { throw new Error("No products found") })
            await expect(service.getProducts(0, 0)).rejects.toThrow("No products found")
        })
    })

    describe("getProduct", () => {
        test("should get a product by id", async () => {
            const product = ProductFactory.build()
            jest.spyOn(MockCatalogRepository.prototype, 'findById').mockImplementationOnce(() => Promise.resolve(product))
            const result = await service.getProduct(String(product.id));
            expect(result).toMatchObject(product)
        });
        test("show throw an error with product not found", async () => {
            const product = ProductFactory.build();
            jest.spyOn(MockCatalogRepository.prototype, 'findById').mockImplementationOnce(() => { throw new Error("Product not found") })
            await expect(service.getProduct(String(product.id))).rejects.toThrow("Product not found")
        })
    })

    describe("deleteProduct", () => {
        test("should delete a product by id", async () => {
            const product = ProductFactory.build()
            jest.spyOn(MockCatalogRepository.prototype, 'delete').mockImplementationOnce(() => Promise.resolve({ id: String(product.id) }))
            const result = await service.deleteProduct(String(product.id));
            expect(result).toEqual({ id: String(product.id) })
        })
        test("should throw an error with product not found", async () => {
            const product = ProductFactory.build()
            jest.spyOn(MockCatalogRepository.prototype, 'delete').mockImplementationOnce(() => { throw new Error("Product not found") })
            await expect(service.deleteProduct(String(product.id))).rejects.toThrow("Product not found")
        })
    })
})
