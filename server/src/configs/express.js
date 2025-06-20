import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { errorHandler } from "../middlewares/errorHandler.middleware.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
if (process.env.NODE_ENV === "development") {
    app.use(logger("dev"));
}
app.use(errorHandler);

export default app;
