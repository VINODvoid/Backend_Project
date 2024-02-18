import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"
const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation of user details - not empty
    // check if user exists : username, email
    // check images , check for avatar 
    // upload images to cloudinary
    // create user object - create entry in db
    // remove password  & refreshToken from response
    // check for user response
    // return response
    const {fullName , email , username , password} = req.body;    if([fullName , email , username ,password].some( (field)=> field?.trim()===""))
    {
        throw new ApiError(400,"All fields are required");
    }
    const existedUser = User.findOne({
        $or:[
            {email},
            {username}
        ]
    })
    if(existedUser)
    {
        throw new ApiError(409,"User with email or username already exists");
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path; 
    if(avatarLocalPath)
    {
        throw new ApiError(400,"Avatar is required");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if(!avatar || !coverImage)
    {
        throw new ApiError(500,"Error while uploading images");
    }
    const user =await User.create({
        fullName,
        email,
        avatar : avatar.url,
        coverImage:coverImage?.url || "",
        username:username.toLowerCase() ,
        password,
    })
    const createdUser = await User.findById(user._id)
    .select("-password -refreshToken");
    if(!createdUser)
    {
        throw new ApiError(500,"Error while creating user");
    }
    return res.status(201).json(
        new ApiResponse(200 , createdUser,"User created successfully")
    )
});


export {registerUser};