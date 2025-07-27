const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;
const API_URL = process.env.API_URL;

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;

const MONGODB_URI = process.env.MONGODB_URI;

const CLOUDINARY = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
};

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
};
