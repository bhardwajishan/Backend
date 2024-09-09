import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiError } from '../utils/apiError.js'
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/apiResponse.js'


// AsyncHandler func. is called
const registerUser = asyncHandler( async (req,res) => {
    // get user details from frontend
    // validation
    // check if user is already exist: username,email
    // check for images, check for avatar
    // upload them to cloudinary,avatar
    // create user object - create entry in db
    // remove password and refresh token field from response 
    // check for user creation 
    // return response


    // User details are collected from body
    const {fullname,username,email,password} = req.body
    console.log(email)

    // Validation is performed i.e., every data is gathered or not
    if ([fullname,username,email,password].some((field)=>field?.trim()==="")) {
         throw new ApiError(400,"All fields are required")
    }

    // To check whether we have the user already or not
    const existedUser = User.findOne({
        $or:[{ username }, { email }]
    })

    // If user is already there
    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    // To get Local-Path of avatar and coverImage
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    
    // If local path of avatar is not present
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    // Now avatar and coverImage are uploaded on cloudinary and from their we get response data
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    // If avatar is not gathered
    if(!avatar) {
        throw new ApiError(400,"Avatar file is required")
    }

    // Create new user using user model
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    // After creating a user provide every detail except password and refresh token
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // If user is not created
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering user")
    }

    // return the details of registered user
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )

} )


export {registerUser}