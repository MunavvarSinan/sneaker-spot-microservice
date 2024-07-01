import { CartRequestInput, CartRequestSchema } from "@dto/cart.dto";
import { RabbitMQClient } from "@infrastructure/adapters/rabbitmq";
import Producer from "@infrastructure/adapters/rabbitmq/producer";
import { ValidateRequest } from "@utils/request-validator";
import { Channel } from "amqplib";
import { Request, Response, Router } from "express";
import { injectable } from "inversify";

@injectable()
export class CartRoutes {
    router: Router;
    productChannel!: Channel;
    producer!: Producer;
    private rabbitMQClient: RabbitMQClient
    constructor() {
        this.router = Router();
        this.rabbitMQClient = RabbitMQClient.getInstance()
    }

    public async createCart(req: Request, res: Response) {
        try {
            const err = ValidateRequest<CartRequestInput>(req.body, CartRequestSchema)
            if (err) {
                return res.status(400).json(err)
            }
            const { productId } = req.body
            const productDetails = await this.rabbitMQClient.rpcProducer.rpcRequest(
                { productId },
                'getProductDetails');
            console.log({ productDetails });
            if (!productDetails) {
                return res.status(404).json({ message: 'product not found' })
            }
            return res.status(200).json(productDetails)
        } catch (error) {
            return res.status(500).json({ error })
        }
    }
    public async getCart(req: Request, res: Response) {
        res.status(200).json({ message: 'hello' })
    }
    public async updateCart(req: Request, res: Response) {
        res.status(200).json({ message: 'hello' })
    }
    public async deleteCart(req: Request, res: Response) {
        res.status(200).json({ message: 'hello' })
    }
    routes(): Router {
        this.router.post('/cart', this.createCart.bind(this))
        this.router.get('/cart', this.getCart.bind(this))
        this.router.patch('/cart', this.updateCart.bind(this))
        this.router.delete('/cart', this.deleteCart.bind(this))
        return this.router
    }
}