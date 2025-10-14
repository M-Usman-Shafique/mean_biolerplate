import { createReadStream } from "fs";
import { unlinkHandler } from "./unlinkHandler";
import cloudinary from "../services/cloudinary";

export const cloudUpload = async (filePath: string) => {
    if (!filePath) return null;

    try {
        const streamUpload = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "demo" },
                    async (error, result) => {
                        await unlinkHandler(filePath);

                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                createReadStream(filePath).pipe(stream);
            });
        };

        const response = (await streamUpload()) as { secure_url: string };
        return response.secure_url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        await unlinkHandler(filePath);
        return null;
    }
};
