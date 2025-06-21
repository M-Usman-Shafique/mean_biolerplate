import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { ACCESS_TOKEN_SECRET } from "../configs/config.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyAuth = asyncHandler(async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
