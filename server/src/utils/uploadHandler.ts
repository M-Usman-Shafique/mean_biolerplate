import { cloudUpload } from "./cloudUpload";

export const uploadHandler = async (filePath: string | string[]) => {
    try {
        if (!filePath) return null;

        // Single file upload
        if (typeof filePath === "string") {
            return await cloudUpload(filePath);
        }

        // Multi-file upload
        if (Array.isArray(filePath)) {
            return await Promise.all(filePath.map((path) => cloudUpload(path)));
        }

        throw new Error("Invalid fileData type. Must be string or array.");
    } catch (err) {
        console.error("File upload failed:", err);
        return Array.isArray(filePath) ? [] : null;
    }
};
