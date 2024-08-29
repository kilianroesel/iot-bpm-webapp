import { NextFunction, Response, Request } from "express";

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }
}


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof NotFoundError) {
        return res.status(404).json({
            error: "error",
            message: err.message,
        });
    }

    console.error(err.stack); // Log the error stack
    res.status(400).json({
        error: "error",
        message: err.message
    });
};