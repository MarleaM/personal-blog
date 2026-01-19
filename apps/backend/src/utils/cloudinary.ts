import 'dotenv/config';
import { v2 as cloudinary} from 'cloudinary';
import { configDotenv } from 'dotenv';

const cloudName = process.env.CLOUD_NAME;
const cloudKey = process.env.CLOUD_API_KEY;
const cloudSecret = process.env.CLOUD_SECRET;

//registering cloudinary api
cloudinary.config({
    cloud_name: cloudName,
    api_key: cloudKey,
    api_secret: cloudSecret
    //secure: true, //ensure links generated include https
})

export default cloudinary;