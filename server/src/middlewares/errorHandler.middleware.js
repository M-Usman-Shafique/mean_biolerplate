import { NODE_ENV } from "../configs/config.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    const errors = err.errors || [];
    const stack = NODE_ENV === "production" ? undefined : err.stack;

    res.status(statusCode).json(new ApiResponse(statusCode, { errors, stack }, message));
};
