import { User } from "../models/User.model.js";
import { ApiError } from "./ApiError.js";

export const generateTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        const message =
            error.message || "Something went wrong while generating referesh and access token";
        throw new ApiError(500, message);
    }
};
