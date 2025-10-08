import { Model } from "mongoose";
import { ROLES } from "../configs/constants";

export interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: "User" | "Admin";
    avatar: string;
    refreshToken: string;
}

export interface IUserMethods {
    isPasswordValid(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}

export type UserModel = Model<IUser, object, IUserMethods>;

export type Role = (typeof ROLES)[number];

export interface CookieOptions {
    httpOnly: boolean;
    secure: boolean;
    sameSite?: "strict" | "lax" | "none" | boolean;
}
