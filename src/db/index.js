// This file is  used only for connecting database to our backend

import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Function to get database from url
const connectDB = async ()=>{
    try {
        // Function will try to connect database by using mongoose package
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB connected !! DB Host: ${connectionInstance.connection.host}`)
    } catch (error) {
        // If databse is not connected error will be send
        console.log("MONGODB Connection Error: ",error);
        process.exit(1)
    }
}

export default connectDB