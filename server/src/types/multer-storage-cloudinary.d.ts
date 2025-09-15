//VIBE KODED HEHEHEHE

declare module "multer-storage-cloudinary" {
  import { StorageEngine } from "multer";
  import { UploadApiOptions, v2 as cloudinary } from "cloudinary";

  interface CloudinaryStorageOptions {
    cloudinary: typeof cloudinary;
    params?:
      | UploadApiOptions
      | ((
          req: Express.Request,
          file: Express.Multer.File
        ) => UploadApiOptions | Promise<UploadApiOptions>);
  }

  export class CloudinaryStorage implements StorageEngine {
    constructor(options: CloudinaryStorageOptions);

    // these exist internally, just declare them
    _handleFile(
      req: Express.Request,
      file: Express.Multer.File,
      callback: (error?: any, info?: Partial<Express.Multer.File>) => void
    ): void;

    _removeFile(
      req: Express.Request,
      file: Express.Multer.File,
      callback: (error: Error | null) => void
    ): void;
  }
}
