import { Router, Request, Response } from "express";
import { inject } from "inversify";

export class OrderRoutes {
    router: Router;
    constructor() {
        this.router = Router();
    }
    public async createOrder(req: Request, res: Response) {
        res.status(200).json({ message: 'hello' })
    }
    public async getOrder(req: Request, res: Response) {
        res.status(200).json({ message: 'hello' })
    }
    public async getOrders(req: Request, res: Response) {
        res.status(200).json({ message: 'hello' })
    }

    public async deleteOrder(req: Request, res: Response) {
        res.status(200).json({ message: 'hello' })
    }
    routes(): Router {
        this.router.post('/order', this.createOrder.bind(this))
        this.router.get('/order/:id', this.getOrder.bind(this))
        this.router.get('/order', this.getOrders.bind(this))
        this.router.delete('/order/:id', this.deleteOrder.bind(this))
        return this.router
    }
}