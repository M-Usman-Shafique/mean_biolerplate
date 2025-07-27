import { API_URL, PORT } from "./configs/config.js";
import connectDB from "./services/mongodb.js";
import { server } from "./services/websocket.js";

const port = PORT;
const URL = API_URL;

connectDB()
    .then(async () => {
        server.listen(port, () => {
            console.warn(`🚀 Server is running at ${URL}:${port}`);
        });
    })
    .catch((err) => {
        console.error("❌ Failed to connect to MongoDB:", err);
        process.exit(1);
    });
