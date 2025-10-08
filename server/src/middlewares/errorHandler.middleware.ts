import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { NODE_ENV } from "../configs/config";

interface AppError extends Error {
    statusCode?: number;
}

export const errorHandler: ErrorRequestHandler = (
    err: AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.error(err);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    const stack = NODE_ENV === "production" ? undefined : err.stack;

    res.status(statusCode).json({
        statusCode,
        message,
        success: false,
        ...(stack && { stack }),
    });
};
