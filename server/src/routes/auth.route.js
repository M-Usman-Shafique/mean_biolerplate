import { Router } from "express";
import asyncHandler from "express-async-handler";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyAuth } from "../middlewares/verifyAuth.middleware.js";
import {
    signupUser,
    loginUser,
    logoutUser,
    validateSession,
    refreshSession,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", upload.single("file"), signupUser);
router.post("/login", asyncHandler(loginUser));
router.post("/logout", verifyAuth, asyncHandler(logoutUser));
router.get("/validate", asyncHandler(validateSession));
router.post("/refresh", asyncHandler(refreshSession));

export default router;
