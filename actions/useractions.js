"use server";
import mongoose from "mongoose";
import User from "@/models/User";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import ConnectDb from "@/components/ConnectDb";

export const initiate = async (amount, to_username, paymentForm) => {
  
        await mongoose.connect('mongodb://127.0.0.1:27017/chai', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        let user = await User.findOne({username:to_username});
        const secret = user.razorpaySecret;
        const key = user.razorpayKey;

        const instance = new Razorpay({
            key_id: key,
            key_secret: secret
        });

        const options = {
            amount: Number.parseInt(amount) * 100, // Razorpay expects amount in the smallest unit (e.g., paise for INR)
            currency: "INR",
            receipt: "order_rcptid_11" // Optional: Can be used to store a reference to the order
        };

        const x = await instance.orders.create(options);

        await Payment.create({
            oid: x.id, 
            amount: amount,
            to_user: to_username,
            name: paymentForm.name,
            message: paymentForm.message
        });

        return x;
    } 


    // fetch user info from database
    export const fetchUser = async(username)=>{
         await ConnectDb();
         let u = await User.findOne({username:username});
         let user = u.toObject({flattenObjectIds:true});
         return user;
    }

//fetch payment by to_user in sorted manner
export const fetchPayments = async(username)=>{
    await ConnectDb();
    let p = await Payment.find({ to_user: username, done:true }).sort({ amount: -1 }).limit(10).lean();
    return p;
}


// updata user info

export const updateProfile = async (data, oldUsername) => {
    await ConnectDb();
    // Convert form data into an object
    // let ndata = Object.fromEntries(data);

    // If the username is being updated, check if the new username is available
    if (oldUsername !== data.username) {
        let u = await User.findOne({ username: data.username });
        if (u) {
            return { error: "Username already exists" };
        }

        let updated = await User.updateOne({ email: data.email }, data);

        // if the user change their username than change their username in payment schme too show in donated section
        let paymentUpdate =  await Payment.updateMany({to_user: oldUsername}, {to_user:data.username});
    } else {
         // Update the user profile
    let updated = await User.updateOne({ email: data.email }, data);
    // Return the result of the update operation
    
    return updated;
    }

   
};