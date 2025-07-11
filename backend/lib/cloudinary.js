import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary Config:");
console.log("cloud_name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("api_key:", process.env.CLOUDINARY_API_KEY);
console.log("api_secret:", process.env.CLOUDINARY_API_SECRET ? "✅ Loaded" : "❌ MISSING");

export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'blogs', 
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

