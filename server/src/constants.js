import { NODE_ENV } from "./configs/config.js";

const ROLES = ["User", "Admin"];
const cookieOptions = {
    httpOnly: true,
    secure: NODE_ENV,
    // sameSite: "Strict",
};

export { ROLES, cookieOptions };
