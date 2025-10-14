import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { ACCESS_TOKEN_SECRET } from "../configs/config";
import { User } from "../models/User.model";
import { ApiError } from "../utils/ApiError";

const authenticate = async (req: Request) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized request: missing token");
    }

    let decoded;
    try {
        decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as { _id: string };
    } catch {
        throw new ApiError(401, "Invalid or expired access token");
    }

    const user = await User.findById(decoded._id).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(401, "User not found or invalid token");
    }

    return user;
};

const authorizeRole = (role: string) =>
    asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
        const user = await authenticate(req);

        if (user.role !== role) {
            throw new ApiError(403, `Access denied: requires ${role} role`);
        }

        req.user = user;
        next();
    });

const verifyAuth = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
    req.user = await authenticate(req);
    next();
});
const verifyAdmin = authorizeRole("admin");
const verifyUser = authorizeRole("user");

export { verifyAuth, verifyAdmin, verifyUser };
