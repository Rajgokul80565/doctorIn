import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();


const port =  process.env.PORT || 3000;


const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

connectDB();



app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Listening to port ${port}`));
