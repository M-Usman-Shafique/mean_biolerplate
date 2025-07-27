import { User } from "../models/User.model.js";
import { cookieOptions } from "../configs/constants.js";
import { generateTokens } from "./generateTokens.js";
import { ApiResponse } from "./ApiResponse.js";

export const respondWithAuth = async (res, userId, message = "Authenticated") => {
    const { accessToken, refreshToken } = await generateTokens(userId);
    const user = await User.findById(userId).select("-password -refreshToken");

    return res
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .status(200)
        .json(new ApiResponse(200, { user, accessToken, refreshToken }, message));
};
