import { Router } from "express";
import asyncHandler from "express-async-handler";
import { verifyAuth } from "../middlewares/auth.middleware";
import { updateAvatar } from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.patch("/avatar", verifyAuth, upload.single("file"), asyncHandler(updateAvatar));

export default router;
