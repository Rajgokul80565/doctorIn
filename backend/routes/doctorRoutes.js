import express from "express";
import {
    getPatientsSchedules,
    submitPatientResult
} from "../controllers/doctorControllers.js"
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();


router.route("/patients-schedules").post(protect,getPatientsSchedules);
router.route("/attend-patient").post(protect, submitPatientResult);


export default router;