import { API_URL, PORT } from "./configs/config.js";
import app from "./configs/express.js";
import connectDB from "./configs/mongodb.js";

const port = PORT;
const URL = API_URL;

connectDB()
    .then(async () => {
        app.listen(port, () => {
            console.warn(`🚀 Server is running at ${URL}:${port}`);
        });
    })
    .catch((err) => {
        console.error("❌ Failed to connect to MongoDB:", err);
        process.exit(1);
    });
