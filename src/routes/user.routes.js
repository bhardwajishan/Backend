// This code defines a POST route /register that handles user registration.

import { Router } from "express"; // It allows you to create modular, mountable route handlers....
import { registerUser } from "../controllers/user.controller.js"; // This contains the logic for registering a user 
import {upload} from "../middlewares/multer.middleware.js"

const router = Router() //This allows to define routes on const 'router'

router.route("/register").post( //It handles the post req on route '/register'
    // 'upload' is a multer middleware function that handles the uploading of multiple files. 
    upload.fields([ //It expects two fields in the req 'avatar' and 'coverImage'
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser //It is the function that contains the logic for registering a user
)

export default router;