import mongoose from "mongoose";
import {DB_NAME} from '../constants.js'


const connectDB = async () => {
    try {
        mongoose.connect(`${process.env.MONGO_URI}/DB_NAME`)
    } catch (error) {
        console.log("Connection failed", error)
    }
}

export default connectDB;