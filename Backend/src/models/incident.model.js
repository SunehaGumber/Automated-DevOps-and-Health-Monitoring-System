import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
    server: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "server",
        required:[true,"Server is required!"]
    },
    startTime: {
        type: Date,
        default:Date.now()
    },
    resolvedAt: {
        type: Date,
        default:null
    },
    status: {
        type: String,
        enum:["open","closed",null]
    },
    duration: {
        type: Number,
        default:0
    }

}, {
    timestamps:true
});

const incidentModel = mongoose.model('incident', incidentSchema);
export default incidentModel;