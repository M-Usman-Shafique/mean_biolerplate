import { Server } from "socket.io";
import http from "http";
import app from "./express.js";

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
    },
});

const userSocketMap = {};

io.on("connection", (socket) => {
    console.warn(`📌 User ${socket.id} connected`);

    socket.on("connect_error", (err) => {
        console.error("❌ Connection error:", err.message);
    });

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.warn(`✂️  User ${socket.id} disconnected`);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

export { io, app, server };
