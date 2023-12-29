import User from "../models/userModel.js";
import Booking from "../models/bookingModel.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";


// @desc Authenticate User
// @route POST - /api/users/auth
// @access public
const authUser = asyncHandler( async (req, res) => {

    let {email, password} = req.body;
    
    let user = await User.findOne({email});


    if(user && ( await user.matchPassword(password))){
        generateToken(res,user._id);
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            roleType:user.roleType,
            roleName:user.roleName,
        })
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

    const user = {
        _id:req.user._id,
        name:req.user.name,
        email:req.user.email,
    }


    res.status(201).json(user);
});

// @desc  update user profile
// @route PUT - /api/user/profile
// @access private
const updateUserProfile = asyncHandler ( async (req, res) => {

    let user = await User.findById(req.user._id).select("-password");

    if(user){
        user.name = req.body.name || req.user.name;
        user.email = req.body.email || req.user.email;

        if(req.body.password){
            user.password = req.body.password || req.user.password;
        }

        const updatedUser = await user.save();

        res.status(200).json(updatedUser);

    }else{
        res.status(404);
        throw new Error("User Not Found!");
    }
});

// userName:{
//         type: String,
//         required: true,
//     },
//     userId:{
//         type:String,
//         required: true,
//     },
//     doctorName:{
//         type:String,
//         required: true,
//     },
//      doctorId:{
//         type:String,
//         required: true,
//      },
//      specialist:{
//         type:String,
//         required: true,
//      },
//      status:{
//         type:Boolean,
//         required: true,
//      },
//      bookingDateTime:{
//         type:Date,
//         required: true,
//      },

// @desc  Booking appoinment
// @route POST - /api/users/booking
// @access private
const bookingAppointment = asyncHandler (async (req,res)=> {
   let {userName,userId,doctorName,doctorId,specialist,bookingDateTime } = req?.body;
   // status -remaining

    let book = await Booking.create({
        userName,
        userId,
        doctorName,
        doctorId,
        specialist,
        bookingDateTime,
        status:true,
    });

    if(book){
        res.status(201).json({
            _id:book._id,
            doctorName,
            doctorId,
            specialist,
            bookingDateTime
        });
    }else{
        res.status(400);
        throw new Error('invalid Booking data')
    };
})



export { authUser, registerUser, loginOutUser, getUserProfile , updateUserProfile,bookingAppointment};
