import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import uploadDocs from "../controllers/uploadControllers.js";



const router = express.Router();


router.route("/").post(protect, uploadDocs );


export default router;