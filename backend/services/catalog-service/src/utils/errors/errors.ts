import { STATUS_CODE } from "./status-code";

class BaseError extends Error {
    public readonly status: number;

    constructor(name: string, status: number, description: string) {
        super(description);
        this.name = name;
        this.status = status;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}

/**
 * @description 500 internal server error
 * @returns Error
 * @memberof BaseError
 * @example
 * throw new APIError('Internal server error', 500, 'Something went wrong');
 */
export class APIError extends BaseError {
    constructor(description = "Internal server error") {
        super('APIError', STATUS_CODE.INTERNAL_ERROR, description);
    }
}

/**
 * @description 404 not found
 * @returns Error
 * @memberof BaseError
 * @example
 * throw new NotFoundError('NOT FOUND');
 */
export class NotFoundError extends BaseError {
    constructor(description = "NOT FOUND") {
        super('NotFoundError', STATUS_CODE.NOT_FOUND, description);
    }
}

/**
 * @description 400 bad request
 * @returns Error
 * @memberof BaseError
 * @example
 * throw new BadRequestError('BAD REQUEST');
 */
export class BadRequestError extends BaseError {
    constructor(description = "BAD REQUEST") {
        super('BadRequestError', STATUS_CODE.BAD_REQUEST, description);
    }
}

/**
 * @description 401 unauthorized
 * @returns Error
 * @memberof BaseError
 * @example
 * throw new AuthorizeError('Access Denied');
 */
export class AuthorizeError extends BaseError {
    constructor(description = "Access Denied") {
        super('AuthorizeError', STATUS_CODE.UN_AUTHORIZED, description);
    }
}
