import dotenv from 'dotenv';
import connectDB from './db/index.js'
import { app } from './app.js';

// It is used to configure the environment variables
dotenv.config({path:"./env"})

// It is uesd to connect database at some port 
connectDB().then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port: ${process.env.PORT}`)//If database is connected with server 
    })
}).catch((error)=>{
    console.log("MongoDB Connection Failed !!! ",error) //If database is not connected
})




 
