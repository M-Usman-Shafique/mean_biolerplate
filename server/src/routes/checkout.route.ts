import { Router } from "express";
// import { verifyAuth } from "../middlewares/verifyAuth.middleware.js";
import { checkout } from "../controllers/checkout.controller";

const router = Router();

router.post("/", checkout);

export default router;
