import mongoose from "mongoose";

const connectDB = async() => {
    try{
        mongoose.connect.on('connected',() => console.log("DB is OKAY"));
        await mongoose.connect(`${process.env.MONGODB_URI}`)
    }catch(error){
        console.log(error.message);
    }
}

export default connectDB;