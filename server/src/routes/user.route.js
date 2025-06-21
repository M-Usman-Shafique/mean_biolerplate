import { Router } from "express";
import asyncHandler from "express-async-handler";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyAuth } from "../middlewares/verifyAuth.middleware.js";
import { updateAvatar } from "../controllers/user.controller.js";

const router = Router();

router.patch("/avatar", verifyAuth, upload.single("file"), asyncHandler(updateAvatar));

export default router;
