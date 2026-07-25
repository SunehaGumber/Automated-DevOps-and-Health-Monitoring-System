import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import userModel from '../models/user.model.js';
import sessionModel from '../models/session.model.js';
import crypto from 'crypto'

export async function sessionMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({
            message:"unauthorized!"
        })
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    
    const refreshTokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const session=await sessionModel.findOne({
        refreshTokenHash,
        user: decoded.id,
        revoked: false
    })
    const user = await userModel.findById(decoded.id);
    
    if (!user) {
        return res.status(400).json({
            message:"User no longer exists."
        })
    }
    if (!session) {
        return res.status(400).json({
            message:"Session no longer exists."
        })
    }
    req.user = user;
    req.session = session;
    next();
}
