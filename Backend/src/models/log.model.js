import mongoose from 'mongoose'

const logSchema = new mongoose.Schema({
    server: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "servers",
        required:[true,"server id is required."]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:[true,"user id is required."]
    },
    lastChecked: {
        type: Date,
        required:[true,"last checked is required"]
    },
    status: {
        type: String,
        enum: ["up", "down", "pending"],
        default: "pending",
        required:[true,"status is required"]
    },
    url: {
        type: String,
        required:[true,"url is required"],
    },
    responseTime: {
        type: Number,
        required: [true, "response time is required"],
        default: 0
    }
}, {
    timestamps:true
})
logSchema.index({ timestamp: 1 }, { expireAfterSeconds: 604800 })

const logModel = mongoose.model('logs', logSchema);
export default logModel;