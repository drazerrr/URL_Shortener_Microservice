import mongoose from "mongoose";


const connectDB = async () => {
    try {
        mongoose.connect(`${process.env.MONGO_URI}/URL_SHORTENER`)
    } catch (error) {
        console.log("Database connection error ", error)
    }
}

export default connectDB