import { Router } from "express";
import asyncHandler from "express-async-handler";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyAuth } from "../middlewares/verifyAuth.middleware.js";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", upload.single("file"), registerUser);
router.post("/login", asyncHandler(loginUser));
router.post("/logout", verifyAuth, asyncHandler(logoutUser));
router.post("/refresh-token", asyncHandler(refreshAccessToken));

export default router;
