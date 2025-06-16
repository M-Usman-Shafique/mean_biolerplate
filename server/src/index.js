import dotenv from "dotenv";
import express from "express";
import connectDB from "./configs/mongodb.js";

dotenv.config({ path: "./.env" });


const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.status(200).send(`Express server is running at port ${port}`);
});

connectDB()
    .then(async () => {
        app.listen(port, () => {
            console.warn(`Server is running at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    });
