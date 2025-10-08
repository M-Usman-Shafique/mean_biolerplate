import { CookieOptions } from "express";
import { NODE_ENV } from "./config";

export const ROLES = ["User", "Admin"] as const;

export const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    // sameSite: "Strict",
};
