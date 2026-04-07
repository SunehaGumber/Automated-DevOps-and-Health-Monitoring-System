import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:[true,"user is required."]
    },
    otpHash: {
        type: String,
        required:[true,"otphash is required."]
    },
    createdAt: {
        type: String,
        default: Date.now(),
        expires:600
    }
}, {
    timestamps:true
})

const otpModel = mongoose.model('otps', otpSchema);
export default otpModel;