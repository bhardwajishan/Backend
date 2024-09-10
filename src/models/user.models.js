// This code defines a User schema for a MongoDB collection using Mongoose. It includes user authentication functionalities like password hashing, access token generation, and refresh token generation using JWT (JSON Web Token) and bcrypt for password encryption.

import mongoose from "mongoose";
import jwt from 'jsonwebtoken'; // Bearer token i.e., the one who send token we consider him the owner
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, // Cloudinary url
            required: true,
        },
        coverImage: {
            type: String, //Cloudinary url
        },
        watchHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps:true
    }
)

// Logic to encrypt password before saving
userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();//Password is only encrypted when it is modified

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// Compares the provided password with the hashed password stored in the database using bcrypt.compare. Returns true if the passwords match.
userSchema.methods.isPasswordCorrect =  async function (password) {
    return await bcrypt.compare(password, this.password)
}

// Generates a JWT access token containing essential user information (_id, email, username, and fullname).
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// Generates a refresh token that only contains the user's _id. This token can be used to get a new access token when the current one expires.
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)