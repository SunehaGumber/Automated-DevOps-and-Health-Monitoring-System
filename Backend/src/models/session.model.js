import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    refreshTokenHash: {
        type: String,
        required:[true,"refreshTokenHash is necessary."]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    revoked: {
        type: Boolean,
        default:false
    },
    ip: {
        type: String,
        required:[true,"ip is required."]
    },
    userAgent: {
        type: String,
        required:[true,"user agent is required"],
    }
}, {
    timestamps:true
})

const sessionModel = mongoose.model('session', sessionSchema);
export default sessionModel;