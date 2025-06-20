// src/routes/router.js (wrapper for all routes)
import { Router } from "express";
import authRouter from "./auth.route.js";

const router = Router();

router.use("/auth", authRouter);

export default router;
