import mongoose, {Schema} from 'mongoose'


const urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: Number,
        required: true
    }
})

export const URL = mongoose.model("URL", urlSchema)