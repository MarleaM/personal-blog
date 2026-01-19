import 'dotenv/config';
import { v2 as cloudinary} from 'cloudinary';

const cloudName = process.env.CLOUD_NAME;
const cloudKey = process.env.CLOUD_API_KEY;
const cloudSecret = process.env.CLOUD_API_SECRET;

//registering cloudinary api
cloudinary.config({
    cloud_name: cloudName,
    api_key: cloudKey,
    api_secret: cloudSecret
    //secure: true, //ensure links generated include https
});

export const uploadToCloudinary = (fileBuffer: Buffer): Promise<string> => {
    const opts = {
        overwrite: true, 
        invalidate: true, 
        resource_type: "auto" as const, //compiler doesn''t like it w/o "as const" for somer reason
        folder: "blog_images", // all the posts uploads will go to this folder in my accoutn
    };
    
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(opts, (error,result) => { //using upload_stream b/c it rets a writable stream
            if (result && result.secure_url) {
                console.log(result.secure_url);
                return resolve(result.secure_url);
            }
            else {
                console.error("Sorry!! cloudinary error: ",error?.message);
                return reject({message: error?.message})
            }
        });

        stream.end(fileBuffer);
    })
};