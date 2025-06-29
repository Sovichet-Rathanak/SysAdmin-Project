import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/kanban");
        console.log("MongoDB connected successfully");
    }catch(error){
        console.log("MongoDB Connection Error:", error)
    }
};

export default connectDB;
