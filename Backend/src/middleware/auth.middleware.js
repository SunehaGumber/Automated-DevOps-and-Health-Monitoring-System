import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import userModel from '../models/user.model.js';

export async function authMiddleware(req, res, next) {
    try {
        console.log("entering auth middleware.")
        const token = req.headers?.authorization?.split(' ')[1];
        
        if (!token) {
            console.log("Auth Error: No token provided");
            return res.status(401).json({ message: "Unauthorized!" });
        }

        // jwt.verify throws an error if token is invalid or expired
        const decoded = jwt.verify(token, config.JWT_SECRET);

        const user = await userModel.findById(decoded.id);
        
        if (!user) {
            console.log("Auth Error: User not found in DB");
            return res.status(401).json({ message: "Unauthorized!" });
        }

        if (!user.isVerified) {
            return res.status(401).json({ message: "User isn't verified." });
        }

        req.user = user;
        console.log("Auth Success: User attached to request");
        next();
    } catch (err) {
        // This catches JWT expiration, malformed tokens, and DB connection errors
        console.error("Auth Middleware Error:", err.message);
        return res.status(401).json({ 
            message: "Unauthorized! Invalid or expired token.",
            error: err.message 
        });
    }
}