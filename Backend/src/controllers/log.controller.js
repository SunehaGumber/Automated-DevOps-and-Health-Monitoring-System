import logModel from "../models/log.model.js";

export async function getLogs(req, res,next) {
    const id = req.params.id;
    const user = req.user;
    try {
        const logs = await logModel.find({
            server: id,
            user:user._id
        }).sort({ lastChecked: -1 }).limit(100);
        if (logs.length === 0) {
            return res.status(200).json({
                message:"No logs for this user and server"
            })
        }
        return res.status(200).json({
            message: "Logs fetched successfully!",
            logs
        })
    } catch (err) {
        next(err);
    }
}