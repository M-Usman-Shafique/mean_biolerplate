import { CookieOptions } from "express";
import { NODE_ENV } from "./config";

export const ROLES = ["user", "admin"] as const;

export const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    // sameSite: "Strict",
};
