import express from "express";
import {
    getPatientsSchedules
} from "../controllers/doctorControllers.js"
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();


router.route("/patients-schedules").post(protect,getPatientsSchedules);



export default router;