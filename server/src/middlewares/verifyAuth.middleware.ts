import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { ACCESS_TOKEN_SECRET } from "../configs/config";
import { User } from "../models/User.model";
import { ApiError } from "../utils/ApiError";

export const verifyAuth = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const token =
            req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET) as {
            _id: string;
        };

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        let message = "Invalid access token";

        if (error instanceof Error) {
            message = error.message;
        }

        throw new ApiError(401, message);
    }
});
