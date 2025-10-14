import { User } from "../models/User.model";
import { cookieOptions } from "../configs/constants";
import { generateTokens } from "./generateTokens";
import { ApiResponse } from "./ApiResponse";
import { Response } from "express";

export const respondWithAuth = async (res: Response, userId: string, message = "Authenticated") => {
    const { accessToken, refreshToken } = await generateTokens(userId);
    const user = await User.findById(userId).select("-password -refreshToken");

    return res
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .status(200)
        .json(new ApiResponse(200, { user, accessToken, refreshToken }, message));
};
