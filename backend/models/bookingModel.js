import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true,
    },
    userId:{
        type:String,
        required: true,
    },
    doctorName:{
        type:String,
        required: true,
    },
     doctorId:{
        type:String,
        required: true,
     },
     specialist:{
        type:String,
        required: true,
     },
     status:{
        type:Boolean,
        required: true,
     },
     bookingDateTime:{
        type:Date,
        default: Date.now
     },
},{
    timestamps:true,
});


const Booking = mongoose.model("Booking",bookingSchema);

export default Booking;