import mongoose  from "mongoose";

const ConnectDb = async()=>{
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Adjust based on your application's needs
      minPoolSize: 2,  // Maintain a minimum number of connections
      serverSelectionTimeoutMS: 5000, // How long to try to select a server before timing out
      socketTimeoutMS: 45000, // How long a socket can remain idle before closing
      family: 4, // Use IPv4, skip trying IPv6
      }).then().catch((err)=>{
        console.log(err);
      })
}


export default ConnectDb;