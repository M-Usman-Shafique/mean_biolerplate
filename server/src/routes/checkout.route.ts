import { Router } from "express";
import { verifyAuth } from "../middlewares/verifyAuth.middleware";
import { checkout, verifyStripeSession } from "../controllers/checkout.controller";

const router = Router();

router.post("/", verifyAuth, checkout);
router.post("/success", verifyAuth, verifyStripeSession);

export default router;
