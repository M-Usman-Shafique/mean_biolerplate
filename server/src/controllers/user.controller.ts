import { User } from "../models/User.model";
import { uploadHandler } from "../utils/uploadHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { Request, Response } from "express";

export const updateAvatar = async (req: Request, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized");
    }

    const filePath = req.file?.path || "";

    if (!filePath) {
        throw new ApiError(400, "No file to upload");
    }

    const imageUrl = await uploadHandler(filePath);

    if (!imageUrl) {
        throw new ApiError(500, "Failed to upload image");
    }

    const updatedAvatar = await User.findByIdAndUpdate(
        userId,
        { avatar: imageUrl },
        { new: true }
    ).select("avatar");

    if (!updatedAvatar) {
        throw new ApiError(500, "Failed to update user avatar");
    }

    res.status(200).json(
        new ApiResponse(200, { avatar: updatedAvatar }, "Avatar updated successfully")
    );
};
