import { Request, Response, NextFunction } from 'express';
import { NotFoundError, BadRequestError, AuthorizeError, APIError } from './errors';
import { logger } from '@utils/logger';

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export const HandleErrorWithLogger = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const knownErrors = [NotFoundError, BadRequestError, AuthorizeError, APIError];
    let status = 500;
    let logLevel: LogLevel = 'error';
    let message = 'Internal Server Error';

    knownErrors.forEach((ErrorClass) => {
        if (error instanceof ErrorClass) {
            status = error.status;
            message = error.message;
            logLevel = 'warn';
        }
    });

    logger[logLevel]({
        message: error.message,
        stack: error.stack,
        route: req.path,
        method: req.method,
        ip: req.ip,
        status,
    });

    res.status(status).json({
        status,
        message,
    });
};

export const HandleUnCaughtException = async (error: Error) => {
    logger.error({
        message: error.message,
        stack: error.stack,
    });
    process.exit(1);
};
