import { User } from "../models/User.model";
import { ApiError } from "./ApiError";

export const generateTokens = async (userId: string) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(500, "No user found to generate tokens");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        let message = "Something went wrong generating refresh and access token";

        if (error instanceof Error) {
            message = error.message;
        }

        throw new ApiError(500, message);
    }
};
