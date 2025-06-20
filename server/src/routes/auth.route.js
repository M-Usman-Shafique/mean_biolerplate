import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { loginController } from "../controllers/auth/login.controller.js";
import { registerController } from "../controllers/auth/register.controller.js";
import { uploadFileController } from "../controllers/uploadFile.controller.js";

const router = Router();

router.post("/register", upload.single("file"), registerController);
router.post("/login", loginController);
router.post("/upload", upload.array("files"), uploadFileController);

export default router;
