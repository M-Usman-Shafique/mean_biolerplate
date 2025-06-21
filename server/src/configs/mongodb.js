import { MONGODB_URI } from "./config.js";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.warn(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB connection failed: ", error);
        process.exit(1);
    }
};

export default connectDB;
