import { Application } from "express";
import express from 'express';
import { CatalogRoutes } from "../api/catalog.routes";
import { injectable } from "inversify";
import { container } from "./adapters/inversify/container";
import { RabbitMQClient } from "./adapters/rabbitmq";
import { httpLogger, logger } from "@utils/logger";
import { HandleErrorWithLogger, HandleUnCaughtException } from "@utils/errors";


const PORT = process.env.PORT

@injectable()
export class Server {
    public app: Application;
    private server: any;
    private catalogRoutes: CatalogRoutes
    private rabbitMQClient!: RabbitMQClient;

    constructor() {
        this.app = express();
        this.catalogRoutes = container.get<CatalogRoutes>(CatalogRoutes);
        this.rabbitMQClient = RabbitMQClient.getInstance();
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(httpLogger);
    }

    private initializeControllers() {
        this.app.use('/catalog', this.catalogRoutes.routes());
    }

    private errorHandler() {
        this.app.use(HandleErrorWithLogger);

        process.on('uncaughtException', HandleUnCaughtException);
        process.on('unhandledRejection', (reason: any) => {
            throw reason;
        });
    }
    private startListening(): void {
        this.server = this.app.listen(PORT, () => {
            logger.info(`Catalog service is listening on port ${PORT}`)
        }).on('error', (err) => {
            console.log(err);
            process.exit();
        })
    }
    public async start(): Promise<void> {
        this.initializeMiddlewares();
        this.initializeControllers();
        this.errorHandler();

        try {
            await this.rabbitMQClient.initialize();
            this.startListening();
        } catch (error) {
            logger.error(`Error initializing server or  RabbitMQ: ${error}`);
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
