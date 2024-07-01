import express, { Application } from 'express';
import { injectable } from 'inversify';
import { CartRoutes } from '@api/cart.routes';
import { RabbitMQClient } from './adapters/rabbitmq';

const PORT = process.env.PORT || 3000;

@injectable()
export class Server {
    public app: Application;
    private server: any;
    private cartRoutes: CartRoutes;
    private rabbitMQClient: RabbitMQClient;

    constructor() {
        this.app = express();
        this.cartRoutes = new CartRoutes();
        this.rabbitMQClient = RabbitMQClient.getInstance();
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json());
    }

    private initializeControllers(): void {
        this.app.use('/api', this.cartRoutes.routes());
    }

    private startListening(): void {
        this.server = this.app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        }).on('error', (err) => {
            console.error('Server startup error:', err);
            process.exit(1);
        });
    }

    public async start(): Promise<void> {
        this.initializeMiddlewares();
        this.initializeControllers();

        try {
            await this.rabbitMQClient.initialize().then(() => console.log('RabbitMQ initialized successfully'));
            this.startListening();
        } catch (error) {
            console.error('Failed to initialize RabbitMQ:', error);
            process.exit(1);
        }
    }

    public async stop(): Promise<void> {
        if (this.server) {
            await new Promise<void>((resolve) => {
                this.server.close(() => {
                    resolve();
                });
            });
        }
        await this.rabbitMQClient.close();
    }
}
