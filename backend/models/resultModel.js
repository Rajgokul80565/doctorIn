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
         }
},{
    timestamps:true
});



const Result = mongoose.model("Result", resultSchema);


export  default Result;