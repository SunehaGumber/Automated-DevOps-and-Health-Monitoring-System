import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:[true,"user is required."]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: [true, "Email must be unique"],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'],
        lowercase:[true,"email address characters must be in lower case."]
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