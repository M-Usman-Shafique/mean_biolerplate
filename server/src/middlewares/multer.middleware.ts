import fs from "fs";
import path from "path";
import multer from "multer";
import { Request } from "express";

// Ensure the uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (_req: Request, _file, cb) {
        cb(null, uploadDir);
    },
    filename: function (_req: Request, _file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix);
    },
});

export const upload = multer({ storage });
