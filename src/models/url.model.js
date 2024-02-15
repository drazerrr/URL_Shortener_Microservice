import mongoose, {Schema} from "mongoose";


const urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true
    },
    short_url: {
        type: Number,
        required: true
    }
})

const Url = mongoose.model("URL", urlSchema);

export default Url