
import { CreateProductRequest, UpdateProductRequest } from "@dto/product.dto";
import { CatalogService } from "@services/catalog.service";
import { RequestValidator } from "@utils/request-validator";
import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class CatalogRoutes {
    router: Router;

    constructor(
        @inject(CatalogService) private service: CatalogService
    ) {
        this.router = Router();
    }

    async createProduct(req: Request, res: Response) {
        try {
            const { errors, input } = await RequestValidator(CreateProductRequest, req.body);
            if (errors) {
                return res.status(400).json(errors)
            }

            const result = await this.service.createProduct(input);
            res.status(201).json(result);
        } catch (error) {
            const err = error as Error
            return res.status(500).json(err.message)
        }
    }

    async updateProduct(req: Request, res: Response) {
        try {
            const { errors, input } = await RequestValidator(
                UpdateProductRequest,
                req.body
            );
            const id = req.params.id;
            if (errors) {
                return res.status(400).json(errors)
            }

            const result = await this.service.updateProduct({ id, ...input });
            res.status(201).json(result);
        } catch (error) {
            const err = error as Error
            return res.status(500).json(err.message)
        }
    }
    async getProducts(req: Request, res: Response) {
        const limit = Number(req.query["limit"]) || 20
        const offset = Number(req.query["offset"])
        try {
            const response = await this.service.getProducts(limit, offset)
            return res.status(200).json(response)
        } catch (error) {
            const err = error as Error
            return res.status(500).json(err.message)
        }
    }
    async getProduct(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        try {
            const response = await this.service.getProduct(id);
            return res.status(200).json(response)
        } catch (err) {
            return next(err);
        }
    }

    async deleteProduct(req: Request, res: Response) {
        const id = req.params.id
        try {
            const response = await this.service.deleteProduct(id);
            return res.status(200).json(response)
        } catch (error) {
            const err = error as Error;
            if (err.message === "Unable to delete product") {
                return res.status(404).json(err.message);
            }
            return res.status(500).json(err.message);
        }
    }
    routes(): Router {
        this.router.post('/products', this.createProduct.bind(this));
        this.router.patch('/products/:id', this.updateProduct.bind(this));
        this.router.get('/products', this.getProducts.bind(this))
        this.router.get('/products/:id', this.getProduct.bind(this));
        this.router.delete('/products/:id', this.deleteProduct.bind(this));
        return this.router;
    }
}
