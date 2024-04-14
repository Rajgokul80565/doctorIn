import mongoose from "mongoose"; 


const resultSchema = mongoose.Schema({
        userId:{
            type: String,
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
         BookedDate:{
            type:Date,
            default: Date.now,
            required: true,
         },
        reportName:{
            type:String,
            default:""
         },
         reportPath:{
            type:String,
            default:"",
         },
         reportStatus:{
            type:Boolean,
            required: true,
            default: true,
         },
         reportStatusMessage:{
            type:String,
            required: true,
            default: "Unattended",
         }
},{
    timestamps:true
});



const Result = mongoose.model("Result", resultSchema);


export  default Result;