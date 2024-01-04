import mongoose from "mongoose";


const doctorSchema = mongoose.Schema({
    doctorName:{
        type: String,
        required: true,
    },
    doctorId:{
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
    availabilityStatus:{
        type: Boolean,
        required: true,
    }
},
{timestamps: true}
);


const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;