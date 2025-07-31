import { NODE_ENV } from "../configs/config.js";

export const errorHandler = (err, req, res, next) => {
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
