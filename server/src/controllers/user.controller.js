import { User } from "../models/User.model.js";
import { uploadHandler } from "../utils/uploadHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const updateAvatar = async (req, res) => {
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

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { avatar: imageUrl },
        { new: true }
    ).select("-password -refreshToken");

    if (!updatedUser) {
        throw new ApiError(500, "Failed to update user avatar");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { user: updatedUser }, "Avatar uploaded successfully"));
};
