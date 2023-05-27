import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const port =  process.env.PORT || 3000;

const app = express();

app.use("/api/users", userRoutes)

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Listening to port ${port}`));
