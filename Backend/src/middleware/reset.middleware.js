import jwt from "jsonwebtoken"
import config from "../config/config.js";
import userModel from "../models/user.model.js";

export const resetMiddleware = async (req, res, next) => {
    try {
        const resetToken = req.headers?.authorization?.split(' ')[1];

        if (!resetToken) {
            return res.status(400).json({
                message:"Reset token is required!"
            })
        }
        const decoded = jwt.verify(resetToken, config.JWT_SECRET);
        const user=await userModel.findById(decoded.id);
        if (!user) {
            return res.status(400).json({
                message:"Not a legit user."
            })
        }
        req.user = user;
        next();
        
    } catch (err) {
        next(err);
    }
}