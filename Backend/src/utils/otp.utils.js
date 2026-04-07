import otpModel from "../models/otp.model.js";
import crypto from "crypto";
import userModel from "../models/user.model.js";
import { generateOTP } from "./email.utils.js";

export async function sendOTP(req, res) {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  await otpModel.deleteMany({
    user: user._id,
  });
  const otp = generateOTP();

  const otpHash = crypto
    .createHash("sha256")
    .update(otp.toString())
    .digest("hex");

  await otpModel.create({
    otpHash,
    user: user._id,
  });

  return otp;
}
export async function checkOTP(req, res) {
  const { email, otp } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  const otpHash = crypto
    .createHash("sha256")
    .update(otp.toString())
    .digest("hex");

  const found = await otpModel.findOne({
    user: user._id,
    otpHash,
  });
  if (!found) {
      const error = new Error("invalid or expired otp");
      error.statusCode = 400;
      throw error;
  }
    await found.deleteOne();
    return user;
}
