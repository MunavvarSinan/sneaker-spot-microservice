import { faker } from '@faker-js/faker';
import { container } from '@infrastructure/adapters/inversify/container';
import { Server } from '@infrastructure/server'; // Adjust the path as needed
import { Product } from '@models/product.model';
import { CatalogService } from '@services/catalog.service';
import { ProductFactory } from '@utils/fixtures';
import "reflect-metadata";
import request from 'supertest';

// TODO : fix test cases after inilizalizing all the error handlings ( because we are using custom error handlers )

/**
 * In the tests instead of using the actual dependencies just use that class.prototyp
 * eg: instead of using --> service = container.get<CatalogService>(CatalogService)
       you can just use CatalogService.prototype in jest.spyOn
 */

describe("catalogRoutes", () => {
    let server: Server;
    beforeAll(() => {
        server = new Server();
        server.start()
    });

    afterAll(() => {
        container.unbindAll();
        server.stop();
    });

    describe("POST /catalog/products", () => {

        test("should create a new product", async () => {
            const product = ProductFactory.build();
            jest.spyOn(CatalogService.prototype, "createProduct").mockImplementationOnce(() => Promise.resolve(product));
            const response = await request(server.app)
                .post("/catalog/products")
                .send(product);
            expect(response.status).toBe(201);
            expect(response.body).toMatchObject(product);
        });

        test("should response with validation error 400", async () => {
            const requestBody = ProductFactory.build();
            const response = await request(server.app)
                .post("/catalog/products")
                .send({ ...requestBody, name: "" })
                .set("Accept", "aplication/json")
            expect(response.status).toBe(400);
            expect(response.body).toEqual("name should not be empty")
        })

        test("should response with an internal error code 500", async () => {
            const requestBody = ProductFactory.build();

            jest.spyOn(CatalogService.prototype, "createProduct")
                .mockImplementationOnce(() => {
                    return Promise.reject(new Error("unable to create product"))
                });

            const response = await request(server.app)
                .post("/catalog/products")
                .send(requestBody)
                .set("Accept", "application/json");
            expect(response.status).toBe(500);
            expect(response.body).toEqual("unable to create product");
        });
    });

    describe("PATCH /catalog/products/:id", () => {
        test("should update product successfully", async () => {
            const product = ProductFactory.build();
            const requestBody = {
                name: product.name,
                price: product.price,
                stock: product.stock
            }
            jest.spyOn(CatalogService.prototype, "updateProduct").mockImplementationOnce(() => Promise.resolve(product));
            const response = await request(server.app)
                .patch(`/catalog/products/${product.id}`)
                .send(requestBody)
                .set("Accept", 'application/json')
            expect(response.status).toBe(201);
            expect(response.body).toEqual(product)
        })
        test("should response with validation error 400", async () => {
            const product = ProductFactory.build();
            const requestBody = {
                name: product.name,
                price: product.price,
                stock: product.stock
            }
            const response = await request(server.app)
                .patch(`/catalog/products/${product.id}`)
                .send({ ...requestBody, price: 0 })
                .set("Accept", "aplication/json")
            expect(response.status).toBe(400);
            expect(response.body).toEqual("price must be a positive number")
        })
        test("should resoponse with an internal error code 500", async () => {
            const requestBody = ProductFactory.build();
            jest.spyOn(CatalogService.prototype, "updateProduct")
                .mockImplementationOnce(() => {
                    return Promise.reject(new Error("unable to update product"))
                });

            const response = await request(server.app)
                .patch(`/catalog/products/${requestBody.id}`)
                .send(requestBody)
                .set("Accept", "application/json");
            expect(response.status).toBe(500);
            expect(response.body).toEqual("unable to update product");
        })
    })

    describe("GET /catalog/products?limit=0&offset=0", () => {
        test("should return a range of products by offset and limit", async () => {
            const randomLimit = faker.number.int({ min: 10, max: 50 });
            const products = ProductFactory.buildList(randomLimit)
            jest.spyOn(CatalogService.prototype, 'getProducts').mockImplementationOnce(() => Promise.resolve(products))
            const response = await request(server.app)
                .get(`/catalog/products?limit=${randomLimit}&offset=0`)
                .set('Accept', 'application/json')
            console.log(response.body)
            expect(response.status).toBe(200);
            expect(response.body).toEqual(products);
        })

        test("should return empty array no products found", async () => {
            const randomLimit = faker.number.int({ min: 10, max: 50 });
            jest.spyOn(CatalogService.prototype, 'getProducts').mockImplementationOnce(() => Promise.resolve([] as Product[]));
            const response = await request(server.app)
                .get(`/catalog/products?limit=${randomLimit}&offset=0`)
                .set('Accept', 'application/json')
            expect(response.status).toBe(200);
            expect(response.body).toEqual([] as Product[]);
        })

        test("should resoponse with an internal error code 500", async () => {
            const randomLimit = faker.number.int({ min: 10, max: 50 });
            jest.spyOn(CatalogService.prototype, "getProducts")
                .mockImplementationOnce(() => {
                    return Promise.reject(new Error("unable to fetch product"))
                });

            const response = await request(server.app)
                .get(`/catalog/products?limit=${randomLimit}&offset=0`)
                .set("Accept", "application/json");
            expect(response.status).toBe(500);
            expect(response.body).toEqual("unable to fetch product");
        })
    })

    describe("GET /catalog/products/:id", () => {
        test("should return a product by id", async () => {
            const product = ProductFactory.build();
            jest.spyOn(CatalogService.prototype, "getProduct").mockImplementationOnce(() => Promise.resolve(product));
            const response = await request(server.app)
                .get(`/catalog/products/${product.id}`)
                .set('Accept', 'application/json');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(product);
        })
        test("should return an error if no products are found", async () => {
            const product = ProductFactory.build();
            jest.spyOn(CatalogService.prototype, 'getProduct').mockImplementationOnce(() => {
                return Promise.reject(new Error('Product not found'))
            });
            const response = await request(server.app)
                .get(`/catalog/products/${product.id}`)
                .set('Accept', 'application/json');
            expect(response.status).toBe(404);
            expect(response.body).toEqual('Product not found');
        });
        test("should return an interal error code 500", async () => {
            const product = ProductFactory.build();
            jest.spyOn(CatalogService.prototype, "getProduct").mockImplementationOnce(() => Promise.reject(new Error("unable to fetch the product")))
            const response = await request(server.app)
                .get(`/catalog/products/${product.id}`)
                .set('Accept', 'application/json');
            expect(response.status).toBe(500);
            expect(response.body).toEqual('unable to fetch the product');
        })
    })

    describe("DELETE /catalog/products/:id", () => {
        test("should delete a product by id", async () => {
            const product = ProductFactory.build();
            jest.spyOn(CatalogService.prototype, "deleteProduct").mockImplementationOnce(() => Promise.resolve({ id: String(product.id) }));
            const response = await request(server.app)
                .delete(`/catalog/products/${product.id}`)
                .set('Accept', 'application/json');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: product.id });
        })
        test("should return an error if no products are found", async () => {
            const product = ProductFactory.build();
            jest.spyOn(CatalogService.prototype, 'deleteProduct').mockImplementationOnce(() => {
                return Promise.reject(new Error('Unable to delete product'))
            });
            const response = await request(server.app)
                .delete(`/catalog/products/${product.id}`)
                .set('Accept', 'application/json');
            expect(response.status).toBe(404);
            expect(response.body).toEqual('Unable to delete product');
        });
        test("should return an interal error code 500", async () => {
            const product = ProductFactory.build();
            jest.spyOn(CatalogService.prototype, "deleteProduct").mockImplementationOnce(() => Promise.reject(new Error("unable to delete the product")))
            const response = await request(server.app)
                .delete(`/catalog/products/${product.id}`)
                .set('Accept', 'application/json');
            expect(response.status).toBe(500);
            expect(response.body).toEqual('unable to delete the product');
        })
    })

});
