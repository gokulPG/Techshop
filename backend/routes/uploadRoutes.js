import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

//the below process works for saving images in local system, better to go with multer-s3 with aws-sdk, if the app is going to be deployed 

//creating a storage object, telling multer we want to save it to local file system with type of filename mentioned within filename callback
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

//Checking the file type by comparing with the mimeType (ex: image/png), it should be either /jpg/jpeg/png
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null, true)
    } else {
        cb('Images only!')
    }
}

//MAINNNN
//creating an instance of multer to upload an image
const upload = multer({
    storage, 
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
})

//single - uploading one image at a time, upload.single..will execute function storage, checkFileType
//By the time we get into this callback, req will be populated with all info of the uploaded image
//multipart/formdata => anytime you upload, csv, pdf so on formats you need to encode with multipart/formdata

router.post('/', upload.single('image'), (req,res) => {
    res.send(`/${req.file.path}`)
})


export default router;
