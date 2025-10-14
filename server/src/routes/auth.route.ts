import { Router } from "express";
import asyncHandler from "express-async-handler";
import {
    signupUser,
    loginUser,
    logoutUser,
    validateAuth,
    refreshAuth,
} from "../controllers/auth.controller";
import { upload } from "../middlewares/multer.middleware";
import { verifyAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/signup", upload.single("file"), signupUser);
router.post("/login", asyncHandler(loginUser));
router.post("/logout", verifyAuth, asyncHandler(logoutUser));
router.get("/validate", asyncHandler(validateAuth));
router.post("/refresh", asyncHandler(refreshAuth));

export default router;
