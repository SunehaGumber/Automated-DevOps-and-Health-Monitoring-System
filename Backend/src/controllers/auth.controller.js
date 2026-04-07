import userModel from "../models/user.model.js";
import otpModel from "../models/otp.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { generateOTP, generateHTML } from "../utils/email.utils.js";
import sendEmail from "../services/email.service.js";
import sessionModel from "../models/session.model.js";
import createSession from "../utils/session.utils.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { checkOTP, sendOTP } from "../utils/otp.utils.js";

export async function register(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required for registering user.",
    });
  }
  try {
    const isUserAlreadyRegistered = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (isUserAlreadyRegistered) {
      return res.status(400).json({
        message: "User already registered with this username or email.",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      email,
      username,
      password: hash,
    });
    const otp = generateOTP();
    const html = generateHTML(otp);
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    await otpModel.create({
      user: user._id,
      otpHash,
      createdAt: Date.now(),
    });
    await sendEmail(
      user.email,
      "OTP for user verification",
      "Enter this code to verify yourself.",
      html,
    );
    return res.status(201).json({
      message: "User registered successfully!",
      user: {
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        role:user.role
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}

export async function verifyEmail(req, res) {
  try {
    const user=await checkOTP(req, res);

    user.isVerified = true;
    await user.save();

    const accessToken = await createSession(user, req, res);

    return res.status(200).json({
      message: "user verified successfully!",
      user: {
        email: user.email,
        username: user.username,
        verified: user.isVerified,
        role:user.role
      },
      accessToken,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password is missing.",
    });
  }
  try {
    const user = await userModel.findOne({ email });

    if (!user.isVerified) {
      return res.status(400).json({
        message: "user isn't verified.",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const accessToken = await createSession(user, req, res);

    return res.status(200).json({
      message: "user login successfully!",
      user: {
        username: user.username,
        email: user.email,
        verified: user.isVerified,
        role:user.role
      },
      accessToken,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server error!",
    });
  }
}

export async function rotateTokens(req, res) {
  const session = req.session;
  const user = req.user;

  try {
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

    session.refreshTokenHash = refreshTokenHash;
    await session.save();

    res.cookie("token", refreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(201).json({
      message: "Tokens refreshed successfully!",
      accessToken,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function logout(req, res) {
  const session = req.session;
  try {
    session.revoked = true;
    await session.save();
    res.clearCookie("token");
    return res.status(200).json({
      message: "user logged out successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}

export async function logoutall(req, res) {
  const user = req.user;
  try {
    await sessionModel.updateMany(
      {
        user: user._id,
        revoked: false,
      },
      { revoked: true },
    );
    res.clearCookie("token");
    return res.status(200).json({
      message: "logged out from all devices successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function resendOtp(req, res) {
  const otp = await sendOTP(req, res);
  const { email } = req.body;
  const html = generateHTML(
    otp,
    "Your verification code",
    "Enter This code to verify yourself",
  );

  await sendEmail(
    email,
    "Verification Code",
    "Enter This code to verify yourself",
    html,
  );

  return res.status(201).json({
    message: "Otp sent successfully!",
  });
}

export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const otp = await sendOTP(req);

    const html = generateHTML(
      otp,
      "Password reset code.",
      "Please enter this code for resetting your password.",
    );
    await sendEmail(
      email,
      "Reset Code",
      "Enter This code to reset password",
      html,
    );

    return res.status(200).json({
      message: "OTP sent successfully!",
    });
  } catch (err) {
    const status = err.statusCode || 500;
    return res.status(status).json({
      message: err.message || "Internal Server Error",
    });
  }
}

export async function verifyCode(req, res) {
    try {
        const user = await checkOTP(req, res);
        const resetToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
          expiresIn: "10m",
        });
      
        return res.status(200).json({
          message: "Otp verified successfully.",
          resetToken,
        });
        
    } catch (err) {
        const status = err.statusCode || 500;
    return res.status(status).json({ message: err.message || "Internal Server Error" });
    }
}

export async function changePassword(req, res) {
    try {
        const { resetToken, password } = req.body;
        if (!resetToken) {
          return res.status(400).json({
            message: "first enter otp",
          });
        }
        const decoded = jwt.verify(resetToken, config.JWT_SECRET);
        const hash = await bcrypt.hash(password, 10);
      
        await userModel.findByIdAndUpdate(decoded.id, { password: hash });
      
        return res.status(200).json({
          message: "Password updated successfully!",
        });
        
    }catch (err) {
        return res.status(500).json({
            message:"Internal Server error"
        })
    }
}

export async function getMe(req,res){
    const user = req.user;
    return res.status(200).json({
        message: "user fetched successfully!",
        user: {
            username: user.username,
            email: user.email,
            verified: user.isVerified,
            role:user.role
        }
    })
}