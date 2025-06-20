import { cloudUpload } from "./cloudUpload.js";

export const uploadHandler = async (fileData) => {
    try {
        if (!fileData) return null;

        // Single file upload
        if (typeof fileData === "string") {
            return await cloudUpload(fileData);
        }

        // Multiple files upload
        if (Array.isArray(fileData)) {
            return await Promise.all(fileData.map((path) => cloudUpload(path)));
        }

        throw new Error("Invalid fileData type. Must be string or array.");
    } catch (err) {
        console.error("File upload failed:", err);
        return Array.isArray(fileData) ? [] : null;
    }
};
