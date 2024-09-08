// This file will handle our server all server related work is done inside this file

import express from 'express';
import cors from 'cors'; //Cors is needed to connect backend and frontend
import cookieParser from 'cookie-parser';//Cookie-parser is used to store and retrieve cookies from clients device

const app = express()

// We are creating a middleware that is used to connect frontend from our server
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true,
}))

// These middlewares are used to collect data in simpler format 
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}))

// This middleware is used to handle any assets in public folder
app.use(express.static("public"))

// This middleware is used to collect cookies from client device
app.use(cookieParser())


// Routes import

import userRouter from './routes/user.routes.js'


// Routes description
app.use("/api/v1/users",userRouter)


export {app}