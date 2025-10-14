import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY } from "../configs/config";

cloudinary.config(CLOUDINARY);

export default cloudinary;
