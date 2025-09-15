import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "certificates",
  } as {
    folder: string;
  },
});

const upload = multer({ storage });

export { upload };
