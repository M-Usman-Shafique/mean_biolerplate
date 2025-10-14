// wrapper for all routes
import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import checkoutRouter from "./checkout.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/checkout", checkoutRouter);

export default router;
