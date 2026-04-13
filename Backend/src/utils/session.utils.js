import jwt from 'jsonwebtoken';
import config from "../config/config.js"
import crypto from 'crypto'
import sessionModel from '../models/session.model.js';

export default async function createSession(user,req,res) {
      const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );
    const userAgent = req.headers["user-agent"];
    await sessionModel.create({
      refreshTokenHash,
      user: user._id,
      userAgent,
      ip: req.ip,
    });
    res.cookie("token", refreshToken, {
      httpOnly: true,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });
    return accessToken;
}