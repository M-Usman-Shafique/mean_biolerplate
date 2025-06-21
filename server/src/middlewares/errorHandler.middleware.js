import { NODE_ENV } from "../configs/config.js";

export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    const errors = err.errors || [];

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors,
        stack: NODE_ENV === "production" ? undefined : err.stack,
    });
};
