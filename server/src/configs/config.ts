import dotenv from "dotenv";

let envPath = ".env.dev";
if (process.env.NODE_ENV === "production") envPath = ".env.prod";
else if (process.env.NODE_ENV === "test") envPath = ".env.test";

dotenv.config({ path: envPath });

const requireEnv = (name: string): string => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`❌ Missing required environment variable: ${name}`);
    }
    return value as string;
};

const NODE_ENV = (process.env.NODE_ENV ?? "development") as "development" | "production";
const PORT = process.env.PORT || 3000;
const CLIENT_URL = requireEnv("CLIENT_URL");
const API_URL = requireEnv("API_URL");

const ACCESS_TOKEN_SECRET = requireEnv("ACCESS_TOKEN_SECRET");
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || "1d";
const REFRESH_TOKEN_SECRET = requireEnv("REFRESH_TOKEN_SECRET");
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || "10d";

const MONGODB_URI = requireEnv("MONGODB_URI");

const CLOUDINARY = {
    cloud_name: requireEnv("CLOUDINARY_CLOUD_NAME"),
    api_key: requireEnv("CLOUDINARY_API_KEY"),
    api_secret: requireEnv("CLOUDINARY_API_SECRET"),
};

const STRIPE = {
    SECRET_KEY: requireEnv("STRIPE_SECRET_KEY"),
    PUBLISHABLE_KEY: requireEnv("STRIPE_PUBLISHABLE_KEY"),
    WEBHOOK_SECRET: requireEnv("STRIPE_WEBHOOK_SECRET"),
};

const USE_WEBSOCKET = process.env.USE_WEBSOCKET === "true";

export {
    NODE_ENV,
    PORT,
    CLIENT_URL,
    API_URL,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY,
    MONGODB_URI,
    CLOUDINARY,
    STRIPE,
    USE_WEBSOCKET,
};
