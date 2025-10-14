import fs from "fs/promises";

export const unlinkHandler = async (filePath: string) => {
    try {
        await fs.unlink(filePath);
    } catch (err) {
        console.error("File deletion error:", err);
    }
};
