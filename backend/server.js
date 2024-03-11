import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js"
import doctorRoutes from "./routes/doctorRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";

dotenv.config();

const port =  process.env.PORT || 3000;

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors())
app.use("/uploads", express.static("uploads"));

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    console.log("files -", file);
      cb(null, uniqueSuffix + file.originalname);
    }
  })


const upload = multer({ storage });


app.post("/api/upload", upload.single("file") ,(req, res) => {
    console.log("path" , req?.file?.path);
    console.log("fileName", req?.file?.filename);
    res.status(201).json(req.file);
});


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Listening to port ${port}`));
