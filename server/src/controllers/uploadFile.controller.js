import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadHandler } from "../utils/uploadHandler.js";

export const uploadFileController = asyncHandler(async (req, res) => {
    const filePaths = req.files.map((file) => file.path);
    const imageUrls = await uploadHandler(filePaths);
    res.json({ imageUrls });
});
