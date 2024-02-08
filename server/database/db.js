import mongoose from 'mongoose'


const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        });
        console.log("database connected successfully");
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;