import mongoose from "mongoose";


const doctorSchema = mongoose.Schema({
    doctorName:{
        type: String,
        required: true,
    },
    loginId:{
        type: String,
        required: true,
    },
    specialist:{
        type: String,
        required: true,
    },
    experience:{
        type: Number,
        required: true,
        default: 0,
    },
    availabilityStatus:{
        type: Boolean,
        required: true,
    },
    profilePicture:{
        type:String,
        default:"",
    },
},
{timestamps: true}
);


const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;