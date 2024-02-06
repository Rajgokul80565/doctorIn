import jwt  from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Doctor from "../models/doctorsModel.js";


const protect = asyncHandler( async (req,res,next) => {

    let token = req.cookies.jwt;

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        }catch(e){
            res.status(400);
            throw new Error("Non Authorize user");
        }
        
    }else{
        res.status(400);
        throw new Error("Non Authorize User, No Token")
    }
});

export {protect} 

