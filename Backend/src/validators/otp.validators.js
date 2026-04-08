import { z } from 'zod';
export const otpSchema = z.object({
     email: z.string()
    .trim()
    .email("Invalid email format. Please provide a real email address.")
    .toLowerCase(),
    otp:z.string().length(6,"otp must be exactly 6 digits.")
})


// This is a partial schema used for OTP resending or Forgot Password
export const emailSchema = z.object({
  email: z.string()
    .trim()
    .email("Invalid email format. Please provide a real email address.")
    .toLowerCase(),
});