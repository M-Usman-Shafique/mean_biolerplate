import mongoose, { Model, type CallbackError } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    ACCESS_TOKEN_EXPIRY,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET,
} from "../configs/config";
import type { IUser, IUserMethods, UserModel } from "../types/user";

const userSchema = new mongoose.Schema<IUser, Model<UserModel>, IUserMethods>(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
            minlength: 3,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            unique: true,
            lowercase: true,
            index: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        avatar: {
            type: String,
            default: "",
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Password hashing middleware before saving user to DB
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: unknown) {
        next(error as CallbackError);
    }
});

// Method to check if password is correct
userSchema.methods.isPasswordValid = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (): string {
    return jwt.sign({ _id: this._id }, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
    } as jwt.SignOptions);
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id, username: this.username, email: this.email },
        REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRY } as jwt.SignOptions
    );
};

export const User = mongoose.model("User", userSchema);
