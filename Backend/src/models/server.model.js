import mongoose from 'mongoose';

const serverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name of app is required."],
    },
    url: {
        type: String,
        required: [true, "URL of your app is required."],
        match: /^https?:\/\/.+/
    },
    status: {
        type: String,
        enum: ["up", "down", "pending"],
        default:"pending"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"user is required"]
    },
    lastChecked: {
        type: Date,
        default:null
    },
    responseTime: {
        type: Number,
        default:0
    }
})
const serverModel = mongoose.model("servers", serverSchema);
export default serverModel;