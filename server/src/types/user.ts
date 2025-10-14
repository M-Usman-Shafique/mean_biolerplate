import { Model } from "mongoose";
import { ROLES } from "../configs/constants";
import mongoose from "mongoose";

export interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: "user" | "admin";
    avatar?: string;
    refreshToken?: string;
}

export interface IUserMethods {
    isPasswordValid(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}

export type UserDocument = mongoose.Document & IUser & IUserMethods;

export type UserModel = Model<UserDocument>;

export type Role = (typeof ROLES)[number];

export interface CookieOptions {
    httpOnly: boolean;
    secure: boolean;
    sameSite?: "strict" | "lax" | "none" | boolean;
}
