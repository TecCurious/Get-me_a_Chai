import mongoose from "mongoose";


const UserSchema = mongoose.Schema({

    name:{type:String},
    email:{type:String, required:true},
    username:{type:String, required:true },
    profilepic:{type:String}, 
    coverpic:{type:String}, 
    razorpayKey:{type:String},
    razorpaySecret:{type:String},
    createdAt:{type:Date, default: Date.now},
    updatedAt:{type:Date, default: Date.now},
    done:{type:Boolean, default:false},
})

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;