import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required:true,
        },
        email:{
            type: String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        roleType:{
            type:Number,
            default:0,
        },
        roleName:{
            type:String,
            default:"patient",
        }
    }, {
        timestamps:true,
    }
);

userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }
    
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


const User = mongoose.model("User",userSchema);

export default User;