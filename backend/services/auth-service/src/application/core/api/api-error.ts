import { Response } from 'express';
import {
    AuthFailureResponse,
    AccessTokenErrorResponse,
    InternalErrorResponse,
    NotFoundResponse,
    BadRequestResponse,
    ForbiddenResponse,
    SecurityErrorResponse,
} from './api-response';
import config from '@shared/config';

enum ErrorType {
    BAD_TOKEN = 'BadTokenError',
    TOKEN_EXPIRED = 'TokenExpiredError',
    UNAUTHORIZED = 'AuthFailureError',
    ACCESS_TOKEN = 'AccessTokenError',
    INTERNAL = 'InternalError',
    NOT_FOUND = 'NotFoundError',
    NO_ENTRY = 'NoEntryError',
    NO_DATA = 'NoDataError',
    BAD_REQUEST = 'BadRequestError',
    FORBIDDEN = 'ForbiddenError',
    UserAlreadyExistsError = 'UserAlreadyExistsError',
    RabbitMqConnectionError = 'RabitMqConnectionError',
    SecurityError = 'SecurityError',
    TokenError = 'TokenError'
}

export abstract class ApiError extends Error {
    constructor(public type: ErrorType, public message: string = 'error') {
        super(type);
    }

    public static handle(err: ApiError, res: Response): Response {
        switch (err.type) {
            case ErrorType.BAD_TOKEN:
            case ErrorType.TOKEN_EXPIRED:
            case ErrorType.TokenError:
            case ErrorType.UNAUTHORIZED:
                return new AuthFailureResponse(err.message).send(res);
            case ErrorType.ACCESS_TOKEN:
                return new AccessTokenErrorResponse(err.message).send(res);
            case ErrorType.INTERNAL:
                return new InternalErrorResponse(err.message).send(res);
            case ErrorType.NOT_FOUND:
            case ErrorType.NO_ENTRY:
            case ErrorType.NO_DATA:
                return new NotFoundResponse(err.message).send(res);
            case ErrorType.BAD_REQUEST:
                console.log("error message", err.message)
                return new BadRequestResponse(err.message).send(res);
            case ErrorType.FORBIDDEN:
                return new ForbiddenResponse(err.message).send(res);
            case ErrorType.SecurityError:
                return new SecurityErrorResponse(err.message).send(res);
            default: {
                let message = err.message;
                // Do not send failure message in production as it may send sensitive data
                if (config.NODE_ENV === 'production') message = 'Something wrong happened.';
                return new InternalErrorResponse(message).send(res);
            }
        }
    }
}

export class AuthFailureError extends ApiError {
    constructor(message = 'Invalid Credentials') {
        super(ErrorType.UNAUTHORIZED, message);
    }
}

export class InternalError extends ApiError {
    constructor(message = 'Internal error') {
        super(ErrorType.INTERNAL, message);
    }
}

export class BadRequestError extends ApiError {
    constructor(message = 'Bad Request') {
        super(ErrorType.BAD_REQUEST, message);
    }
}

export class NotFoundError extends ApiError {
    constructor(message = 'Not Found') {
        super(ErrorType.NOT_FOUND, message);
    }
}

export class ForbiddenError extends ApiError {
    constructor(message = 'Permission denied') {
        super(ErrorType.FORBIDDEN, message);
    }
}

export class NoEntryError extends ApiError {
    constructor(message = "Entry don't exists") {
        super(ErrorType.NO_ENTRY, message);
    }
}

export class BadTokenError extends ApiError {
    constructor(message = 'Token is not valid') {
        super(ErrorType.BAD_TOKEN, message);
    }
}

export class TokenExpiredError extends ApiError {
    constructor(message = 'Token is expired') {
        super(ErrorType.TOKEN_EXPIRED, message);
    }
}

export class NoDataError extends ApiError {
    constructor(message = 'No data available') {
        super(ErrorType.NO_DATA, message);
    }
}

export class AccessTokenError extends ApiError {
    constructor(message = 'Invalid access token') {
        super(ErrorType.ACCESS_TOKEN, message);
    }
}

export class RabitMqConnectionError extends ApiError {
    constructor(message = 'RabbitMQ connection error') {
        super(ErrorType.INTERNAL, message);
    }
}

export class SecurityError extends ApiError {
    constructor(message = 'Security error') {
        super(ErrorType.SecurityError, message);
    }
}

export class TokenError extends ApiError {
    constructor(message = 'Token error') {
        super(ErrorType.INTERNAL, message);
    }
}