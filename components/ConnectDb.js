import mongoose  from "mongoose";

const ConnectDb = async()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/chai', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then().catch((err)=>{
        console.log(err);
      })
}


export default ConnectDb;