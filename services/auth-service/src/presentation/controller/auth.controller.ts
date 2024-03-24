import { Router, Request, Response } from "express";

export class AuthController {
    router: Router;

    constructor() {
        this.router = Router();
    }
    test(req: Request, res: Response) {
        res.send('Hello ');
    }
    routes(): void {
        this.router.get('/', this.test.bind(this));
    }
}