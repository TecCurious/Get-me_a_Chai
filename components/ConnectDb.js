import mongoose  from "mongoose";

const ConnectDb = async()=>{
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then().catch((err)=>{
        console.log(err);
      })
}


export default ConnectDb;