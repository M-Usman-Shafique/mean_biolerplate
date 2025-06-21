// src/configs/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY } from "./config.js";

cloudinary.config(CLOUDINARY);

export default cloudinary;
