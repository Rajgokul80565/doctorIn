import User from "../models/userModel.js";
import Booking from "../models/bookingModel.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

import Doctor from '../models/doctorsModel.js';


// @desc Authenticate User
// @route POST - /api/users/auth
// @access public
const authUser = asyncHandler( async (req, res) => {

    let {email, password} = req.body; 

    let user = await User.findOne({email});
    
    if(user && ( await user.matchPassword(password))){
        generateToken(res,user._id);
        let doctor = await Doctor.find({ loginId: user._id});
        console.log("doctrAuth", doctor);
        if(doctor.length > 0){
            res.status(201).json({
                _id:doctor[0]._id,
                name:user.name,
                email:user.email,
                roleType:user.roleType,
                roleName:user.roleName,
                profilePicture:user.profilePicture,
                specialist:doctor[0].specialist,
                experience:doctor[0].experience,
                availabilityStatus:doctor[0].availabilityStatus,
                loginId:doctor[0].loginId
            })
        }else{
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                roleType:user.roleType,
                roleName:user.roleName,
                profilePicture:user.profilePicture
            })
        }
       
    }else{
        res.status(401);
        throw new Error('Invalid email or password')
    }

   
});

// @desc Registrer User
// @route POST - /api/users
// @access public
const registerUser = asyncHandler (async (req, res) => {
    let {name, email, password} = req.body;

    console.log('name:', name, email, password);


    let userExist = await User.findOne({email});

    if(userExist) {
        res.status(400);
        throw new Error('User already exists');
    }

    let user = await User.create({name,email,password});

    if(user){
        generateToken(res,user._id);
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        })
    }else{
        res.status(400);
        throw new Error('invalid user data')
    }
});

// @desc  Logout user
// @route POST - /api/user/logout
// @access public
const loginOutUser =  asyncHandler( async (req, res) => {

    //Cleaning the jwt token when the user logout
    res.cookie("jwt","",{ 
        httpOnly:true,
        expires: new Date(0)
    });


    res.status(201).json({message:"User Logged out"});
});

// @desc  get user profile. Auth middleware runs before this and 
// set the req.user to whatever the protect auth middleware returns which is user details by
// verifying the token(via cookies).
// @route GET - /api/user/profile
// @access private
const getUserProfile = asyncHandler( async(req, res) => {
    // let userCheck = await User.find({email:"ali@gmail.com"}).select("-password");
    // let doctor = await Doctor.find({ loginId: req.user._id});
    // console.log("userCheck", userCheck);
    // console.log("doctorCheck -", doctor);
    // console.log("user -",req.user);
    // console.log("body -", req.body);

    const user = {
        _id:req.user._id,
        name:req.user.name,
        email:req.user.email,
    }


    res.status(201).json(user);
});


const getUserById = asyncHandler(async(req,res) => {
    if(req.body.id){
        let userDeatils = await User.find({_id:req.body.id}).select("-password");
        console.log("userDeatils",userDeatils);
        res.status(201).json(userDeatils);
    }else{
        res.status(401).json({userDetails:[], message:"User not found"});
    }
    
})

// @desc  Get Doctors List 
// @route GET - /api/user/getdoctors
// @access private
const getDoctorsList = asyncHandler(async (req,res) => {
        let doctors = await Doctor.find();

        res.status(201).json(doctors);
})

// @desc  update user profile
// @route PUT - /api/user/profile
// @access private
const updateUserProfile = asyncHandler ( async (req, res) => {
  
    let user = await User.findById(req.user._id).select("-password");  
    let doctor = await Doctor.find({ loginId: req.user._id});
    let docData = {};

    // console.log("userLOg -", user);
    // console.log("reqUserLog -", req.body);
    // console.log("bodyLog -", req.user);

    if(user){
        user.name = req.body.name || req.user.name;
        user.email = req.body.email || req.user.email;
        user.profilePicture = req.body.profilePicture || req.user.profilePicture

        if(req.body.password){
            user.password = req.body.password || req.user.password;
        }

        console.log("userInside",user);

        const updatedUser = await user.save();
        if(user.roleType === 1 || req.user.roleType === 1){
          
            console.log("doctorThere", doctor);
           
                if(doctor.length > 0){
                    doctor[0].doctorName = req.body.name || req.user.name;
                    doctor[0].loginId = req.user._id;
                    doctor[0].specialist = req.body.specialist;
                    doctor[0].experience = req.body.experience || 0;
                    doctor[0].availabilityStatus = req.body.status || false;
                    doctor[0].profilePicture =  req.body.profilePicture || req.user.profilePicture;
                    console.log("doctorInside", doctor);
                    const updateDoctor = await doctor[0].save();
                    console.log("updateDocs", updateDoctor);
                    docData={
                        specialist:updateDoctor.specialist,
                        experience:updateDoctor.experience,
                        availabilityStatus:updateDoctor.availabilityStatus,
                    };
                    // res.status(200).json({...updatedUser, 
                    //     specialist:updateDoctor.specialist,
                    //     experience:updateDoctor.experience,
                    //     availabilityStatus:updateDoctor.availabilityStatus,
                    // });
                    // return;
                
                }else{
                    let creatDoctor = await Doctor.create({
                        doctorName:req.body.name || req.user.name,
                        loginId:req.user._id,
                        specialist:req.body.specialist,
                        experience:req.body.experience || 0,
                        availabilityStatus:req.body.status || false,
                        profilePicture: req.body.profilePicture || req.user.profilePicture,
                    });

                    if(creatDoctor){
                        res.status(201).json({
                            _id:creatDoctor._id,
                            doctorName:req.body.name || req.user.name,
                            specialist:req.body.specialist,
                            experience:req.body.experience || 0,
                            availabilityStatus:req.body.status || false,
                            profilePicture: req.body.profilePicture || req.user.profilePicture,
                        });
                    }else{
                        res.status(400);
                        throw new Error('Invalid Doctor data');
                       
                    };
                }
        }
        console.log("updatedUser", updatedUser);
        let combineData = { ...updatedUser.toObject(), ...docData};
        console.log("combineData", combineData);

        res.status(200).json(combineData);

    }else{
        res.status(404);
        throw new Error("User Not Found!");
    }
});


// @desc  Booking appoinment
// @route POST - /api/users/booking
// @access private
const bookingAppointment = asyncHandler (async (req,res)=> {
   let {userName,userId,doctorName,doctorId,specialist,bookingDateTime, fileName, filePath, age, gender} = req?.body;
    

    // Check for missing or invalid data
    if (!userName || !userId || !doctorName || !doctorId || !specialist || !bookingDateTime || !fileName || !filePath || age === undefined || gender === undefined) {
        res.status(400);
        throw new Error('Missing or invalid booking data');
    }

    // Validate age and gender
    if (isNaN(age) || age < 0 || !['male', 'female', 'other'].includes(gender.toLowerCase())) {
        res.status(400);
        throw new Error('Invalid age or gender');
    }

    let book = await Booking.create({
        userName,
        userId,
        doctorName,
        doctorId,
        specialist,
        bookingDateTime,
        status:false,
        fileName,
        filePath,
        age,
        gender
    });

    if(book){
        res.status(201).json({
            _id:book._id,
            doctorName,
            doctorId,
            specialist,
            bookingDateTime,
        });
    }else{
        res.status(400);
        throw new Error('invalid Booking data')
    };
});

// @desc Get Appointment list
// @route GET - /api/users/getusersappoinments 
// access private
const getUserAppointments = asyncHandler(  async (req, res) => {
        let listOfAppointments = await Booking.find({userId:req.user._id});
        console.log("listAppointments", listOfAppointments);
        if(listOfAppointments.length > 0) {
            res.status(201).json({appointmentList: listOfAppointments});
        }else{
            res.status(201).json({appointmentList:[], message:"There's no appointments under this user"});
        }
}); 


const getDoctorDetails = asyncHandler( async (req, res) =>{
    console.log("DoctorDetails Runinng")

        let getDoctorById = await Doctor.findById(req.body.id);
       
        if(getDoctorById){
            res.status(201).json({doctorDetail:getDoctorById})
        }else{
            res.status(201).json({doctorDetail:[], message:"Not found"});
        }
})





export { authUser, 
    registerUser, 
    loginOutUser, 
    getUserProfile , 
    updateUserProfile,
    bookingAppointment,
     getDoctorsList, 
     getUserAppointments,
     getDoctorDetails,
     getUserById
};
