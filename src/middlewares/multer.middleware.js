// This code is setting up file upload handling using Multer, a middleware for handling multipart/form-data in Node.js, which is primarily used for uploading files.

import multer from "multer";

const storage = multer.diskStorage({//is used to configure how and where the files will be stored on the disk.
    destination: function (req, file, cb) { //This is where the files will be stored. In this case, the files are stored in the "./public/temp" directory.

      cb(null, "./public/temp") //The callback function is invoked with null as the first argument (indicating no error), and the second argument is the directory where the file will be saved.

    },
    filename: function (req, file, cb) {//This determines what the name of the uploaded file will be. In this case, the file's original name (file.originalname) is used as its name in the destination folder.
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer(
    {
         storage 
    }
)