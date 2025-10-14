import { NODE_ENV, PORT, CLIENT_URL } from "../configs/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { errorHandler } from "../middlewares/errorHandler.middleware";
import routes from "../routes/router";
import asyncHandler from "express-async-handler";

const app = express();

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
if (NODE_ENV === "development") app.use(logger("dev"));
app.use("/api", routes);
app.use(errorHandler);

app.get(
    "/",
    asyncHandler((_req, res) => {
        res.status(200).send(`🚀  Express server is running at port ${PORT}`);
    })
);

export default app;
