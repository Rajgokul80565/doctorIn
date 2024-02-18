import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const con = await mongoose.connect(process.env.MONGODB_URI);
    }catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;