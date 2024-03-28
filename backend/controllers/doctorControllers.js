import asyncHandler from "express-async-handler";
import Booking from './../models/bookingModel.js';
import Result from "../models/resultModel.js";
import mongoose from "mongoose";


// @desc get the patients schedules for the doctor
// @route POST - /api/doctors/patientsschedules
// @access Private
const getPatientsSchedules = asyncHandler( async (req, res) => {
    if(req?.body?.id){
        let patientSchedule = await Booking.find({doctorId:req.body.id,status:false});
        console.log("patientSchedules", patientSchedule);
        res.status(201).json({patientSchedule:patientSchedule});
    }else{
        res.status(401).json({error:true, message:"give proper body input"})
    }
     
});

// @desc get the result of last appoinments
// @route POST = /api/users/getResult
// access private
// userId:{
//     type: String,
//     required: true,
// },
// doctorName:{
//     type:String,
//     required: true,
// },
// doctorId:{
//     type:String,
//     required: true,
//  },
// reportName:{
//     type:String,
//     default:""
//  },
//  reportPath:{
//     type:String,
//     default:"",
//  },
//  reportStatus:{
//     type:Boolean,
//     required: true,
//     default: true,
//  }
const submitPatientResult = asyncHandler(async (req, res) => {
    let {userId, doctorName, doctorId, reportName, reportPath, reportStatus, bookingId, reportStatusMessage} = req?.body;

    console.log("bookingId", bookingId, typeof bookingId);

    // Check for missing or invalid data
    if (!userId || !doctorName || !doctorId || !reportName || !reportPath || !reportStatus || !bookingId || !reportStatusMessage) {
        res.status(400);
        throw new Error('Missing or invalid patient data');
    }

    const bObjectId = new mongoose.Types.ObjectId(bookingId);

    try {

        const bookingResult = await Booking.updateOne(
            {_id:bObjectId, status:false},
            { $set:{status: true, 
                statusMessage:reportStatusMessage}}
            );

            console.log("bookingResult", bookingResult);
        
            if (bookingResult?.modifiedCount === 1) {
                // return res.status(200).json({ message: 'Booking marked as attended' });
                let resultData = await Result.create({
                    userId, 
                    doctorName, 
                    doctorId,
                    reportName,
                    reportPath, 
                    reportStatus,
                    reportStatusMessage
                });
            
                if(resultData){
                    res.status(201).json({userId, status:"Patient Attended"});
                }else{
                    res.status(400);
                    throw new Error('invalid Patient data')
                };
    
              } else {
                return res.status(404).json({ error: 'Booking not found or already attended' });
              }

        
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    
});


export {getPatientsSchedules, submitPatientResult};