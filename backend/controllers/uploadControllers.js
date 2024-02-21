import asyncHandler from "express-async-handler";
import multer from "multer";




const uploadDocs = asyncHandler(async (req,res) => {
    // console.log("req" , req.user);
    res.status(201).json(req.file);
});

export default uploadDocs;

// app.post("/api/upload", upload.single("file") ,(req, res) => {
//     console.log("req" , req.user);
//     res.status(201).json(req.file);

// });

