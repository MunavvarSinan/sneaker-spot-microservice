import express, { Application, NextFunction, Request, Response } from "express";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import compressFilter from "@application/core/compress-filter";
import { ApiError, InternalError, NotFoundError } from "@application/core/api/api-error";

import config from "@shared/config";

import rateLimiter from "@middleware/rate-limiter";
import { container } from "tsyringe";
import { AuthController } from "@presentation/controller/auth.controller";
import { EmailController } from "@presentation/controller/email.controller";

export class Server {
    private app: Application;
    constructor() {
        this.app = express();
    }

    private configureServer(): void {
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(compression({ filter: compressFilter }));
        this.app.use(helmet());
    }

    private setupMiddleware(): void {
        if (config.NODE_ENV === "production") {
            this.app.set("trust proxy", 1);
            this.app.use("/api", rateLimiter);
        }
    }

    private setupRoutes() {
        this.app.use("/api", container.resolve(AuthController).routes());
        this.app.use("/api/email", container.resolve(EmailController).routes());
    }

    private handleErrors(): void {
        this.app.use((req, res, next) => next(new NotFoundError()));

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.log("error--------------", err);
            if (err instanceof ApiError) {
                return ApiError.handle(err, res);
            } else {
                if (config.NODE_ENV === "development") {
                    console.error(err);
                    return res.status(500).send(err.message);
                }
                return ApiError.handle(new InternalError(), res);
            }
        });
    }

    private startListening(): void {
        this.app.listen(config.PORT, () => {
            console.log(`listening to port ${config.PORT}`);
        }).on('error', (err) => {
            console.log(err);
            process.exit();
        })
    }

    public async initializeServer(): Promise<void> {
        this.configureServer();
        this.setupMiddleware();
        this.setupRoutes();
        this.handleErrors();

        this.startListening();
    }
}