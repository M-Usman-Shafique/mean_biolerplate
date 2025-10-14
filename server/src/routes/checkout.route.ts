import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware";
import { checkout, verifyStripeSession } from "../controllers/checkout.controller";

const router = Router();

router.post("/", verifyUser, checkout);
router.post("/success", verifyUser, verifyStripeSession);

export default router;
