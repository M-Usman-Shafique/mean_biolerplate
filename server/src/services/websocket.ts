import { Server } from "socket.io";
import http from "http";
import app from "./express";

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
    },
});

const userSocketMap: Record<string, string> = {};

io.on("connection", (socket) => {
    console.log(`📌 User ${socket.id} connected`);

    socket.on("connect_error", (err) => {
        console.error("❌ Connection error:", err.message);
    });

    const userId = socket.handshake.query.userId;
    if (typeof userId === "string") {
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log(`✂️  User ${socket.id} disconnected`);
        if (typeof userId === "string") {
            delete userSocketMap[userId];
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export function getReceiverSocketId(userId: string): string | undefined {
    return userSocketMap[userId];
}

export { io, app, server };
