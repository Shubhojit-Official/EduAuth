import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/env.js';

cloudinary.config({
    cloud_name: env.CLOUD_NAME as string,
    api_key: env.CLOUD_API_KEY as string,
    api_secret: env.CLOUD_API_SECRET as string
})

export { cloudinary }