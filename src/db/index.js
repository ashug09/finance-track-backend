import mongoose from "mongoose";
import { DB_NAME } from "../Constants.js";

const connectDB = async () => {
    try {
        const connectInfo = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`MongoDB connected: ${connectInfo.connection.host}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

export default connectDB