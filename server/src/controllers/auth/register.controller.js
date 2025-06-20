import { User } from "../../models/User.js";
import { ROLES } from "../../constants.js";
import { uploadHandler } from "../../utils/uploadHandler.js";
import { unlinkHandler } from "../../utils/unlinkHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const registerController = async (req, res) => {
    const fileLocalPath = req.file?.path;
    try {
        const { username, email, password, role } = req.body;

        if ([username, email, password].some((field) => !field?.trim())) {
            throw new ApiError(400, "Username, email, and password are required.");
        }

        if (role && !ROLES.includes(role)) {
            throw new ApiError(400, "Invalid role assignment.");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ApiError(409, "User with this email already exists.");
        }

        let avatarUrl = null;
        if (fileLocalPath) {
            avatarUrl = await uploadHandler(fileLocalPath);
        }

        const newUser = await User.create({
            username,
            email,
            password,
            role,
            avatar: avatarUrl,
        });

        if (!newUser) throw new ApiError(500, "Failed to create user.");

        return res.status(201).json(
            new ApiResponse(
                201,
                {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role,
                    avatar: newUser.avatar,
                },
                "User created successfully."
            )
        );
    } catch (error) {
        if (fileLocalPath) await unlinkHandler(fileLocalPath);
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        return res.status(statusCode).json(new ApiResponse(statusCode, null, message));
    }
};
