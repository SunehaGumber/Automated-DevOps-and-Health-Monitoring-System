import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import userModel from '../models/user.model.js';

export async function authMiddleware(req, res, next) {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message:"Unauthorized!"
        })
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findById(decoded.id);
    
    if (!user) {
        return res.status(401).json({
            message:"Unauthorized!"
        })
    }
    if (!user.isVerified) {
        return res.status(401).json({
            message:"User isn't verified."
        })
    }

    req.user = user;
    next();
}