import "./types/auth";
import { API_URL, USE_WEBSOCKET, PORT } from "./configs/config";
import connectDB from "./services/mongodb";
import { app, server } from "./services/websocket";

connectDB()
    .then(async () => {
        if (USE_WEBSOCKET) {
            server.listen(PORT, () => {
                console.log(`🚀 Server with WebSocket is running at ${API_URL}:${PORT}`);
            });
        } else {
            app.listen(PORT, () => {
                console.log(`🚀 Server is running at ${API_URL}:${PORT}`);
            });
        }
    })
    .catch((err) => {
        console.error("❌ Failed to connect to MongoDB:", err);
        process.exit(1);
    });
