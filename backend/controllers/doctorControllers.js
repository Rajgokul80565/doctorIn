import asyncHandler from "express-async-handler";
import Booking from './../models/bookingModel.js';


// @desc get the patients schedules for the doctor
// @route POST - /api/doctors/patientsschedules
// @access Private
const getPatientsSchedules = asyncHandler( async (req, res) => {
    if(req?.body?.id){
        let patientSchedule = await Booking.find({doctorId:req.body.id});
        console.log("patientSchedules", patientSchedule);
        res.status(201).json({patientSchedule:patientSchedule});
    }else{
        res.status(401).json({error:true, message:"give proper body input"})
    }
     
});


export {getPatientsSchedules};