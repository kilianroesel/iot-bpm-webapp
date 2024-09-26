import { NextFunction, Response, Request } from "express";
import winston from "winston";

const logger = winston.loggers.get("httpLogger")

export const logging = (req: Request, res: Response, next: NextFunction) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().toISOString();

    logger.info(`[${time}] ${method} - ${url}`);

    next();
};
