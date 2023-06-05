import express from "express";
import { authUser, registerUser, loginOutUser,  getUserProfile, updateUserProfile } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", loginOutUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
// router.post("/profile", getUserProfile);
// router.get("/profile", updateUserProfile);


export default router