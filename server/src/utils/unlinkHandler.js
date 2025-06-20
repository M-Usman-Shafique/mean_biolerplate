import fs from "fs/promises";

export const unlinkHandler = async (filePath) => {
    try {
        await fs.unlink(filePath);
    } catch (err) {
        console.warn("File deletion error:", err);
    }
};
