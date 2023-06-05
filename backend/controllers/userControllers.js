import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

// @desc Authenticate User
// @route POST - /api/user/auth
// @access public
const authUser = asyncHandler( async (req, res) => {

    res.status(201).json({message:"Auth User"});
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

    res.status(201).json({message:"loginOutUser"});
});

// @desc  get user profile
// @route GET - /api/user/profile
// @access private
const getUserProfile = asyncHandler( async(req, res) => {

    res.status(201).json({message:"getUserProfile"});
});

// @desc  update user profile
// @route PUT - /api/user/profile
// @access private
const updateUserProfile = asyncHandler ( async (req, res) => {

    res.status(201).json({message:"updateUserProfile"});
});



export { authUser, registerUser, loginOutUser, getUserProfile , updateUserProfile};
