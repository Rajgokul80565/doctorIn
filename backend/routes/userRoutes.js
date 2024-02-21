import express from "express";
import { authUser, 
    registerUser, 
    loginOutUser, 
    getUserProfile, updateUserProfile, 
    bookingAppointment,
    getDoctorsList 
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import uploadDocs from "../controllers/uploadControllers.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", loginOutUser);
router.route("/getdoctors").get(protect,getDoctorsList);
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile);
router.route("/booking").post(protect,bookingAppointment);

// router.post("/profile", getUserProfile);
// router.get("/profile", updateUserProfile);


export default router;