import { v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary =  async(localFilePath) => {
    try {
        if(!localFilePath)
        { return null;}
        // upload file on cloudinary
        else{
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto",
            });
        // file has been uploaded successfully
        console.log("File uploaded successfully",response.url);
        return response;
        }
    } catch (error) {
        fs.unlinkSync(localFilePath); //* remove the locally saved file as it has been uploaded to cloudinary got failed . ! 
        console.log("Error while uploading file to cloudinary",error);
        return null;
}
}

export {uploadOnCloudinary}