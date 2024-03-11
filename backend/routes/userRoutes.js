import express from "express";
import { authUser, 
    registerUser, 
    loginOutUser, 
    getUserProfile, updateUserProfile, 
    bookingAppointment,
    getDoctorsList,
    getUserAppointments,
    getDoctorDetails,
    getUserById
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", loginOutUser);
router.route("/getdoctors").get(protect,getDoctorsList);
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile);
router.route("/booking").post(protect,bookingAppointment);
router.route("/getusersappoinments").get(protect, getUserAppointments);
router.route("/getDoctorDetails").post(protect, getDoctorDetails)
router.route("/getuserbyId").post(protect, getUserById);
// router.post("/profile", getUserProfile);
// router.get("/profile", updateUserProfile);s


export default router;