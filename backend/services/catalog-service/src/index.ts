import "reflect-metadata";
import 'module-alias/register';
import '@infrastructure/adapters/inversify/container';


import { Server } from "@infrastructure/server";

export class AppServer {
    private _server: Server;

    constructor() {
        this._server = new Server();
    }

    public async start(): Promise<void> {
        try {
            await this._server.start();
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
}

const app = new AppServer();
app.start();
