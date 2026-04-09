import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js'
import { sessionMiddleware } from '../middleware/session.middleware.js';
import { authLimiter } from '../middleware/ratelimiter.middleware.js';
import { registerUserSchema,loginUserSchema } from '../validators/auth.validators.js';
import { validate } from '../middleware/validation.middleware.js';
import { otpSchema, emailSchema } from '../validators/otp.validators.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const authRouter = Router();

/**
 * @route POST/api/auth/register
 * @description Registers a user
 * @access Public
 */
authRouter.post('/register',validate(registerUserSchema),authController.register);

/**
 * @route POST/api/auth/verify-email
 * @description Verifies email of a user
 * @access Public
 */

authRouter.post('/verify-email',authLimiter,validate(otpSchema), authController.verifyEmail);

/**
 * @route POST/api/auth/login
 * @description LOGs in the user
 * @access private
 */
authRouter.post('/login', authLimiter,validate(loginUserSchema),authController.login)

/**
 * @route GET/api/auth/refresh-token
 * @description refreshes a token
 * @access private
 */
authRouter.get('/refresh-token', sessionMiddleware,authController.rotateTokens)

/**
 * @route PATCH/api/auth/logout
 * @description logouts from a device
 * @access private
 */
authRouter.patch('/logout',sessionMiddleware, authController.logout);

/**
 * @route PATCH /api/auth/logoutall
 * @description logouts from all devices
 * @access private
 */
authRouter.patch('/logoutall', sessionMiddleware, authController.logoutall)

/**
 * @route POST/api/auth/resend-otp
 * @description resends an otp
 * @access Private
 */
authRouter.post('/resend-otp',authLimiter, validate(emailSchema),authController.resendOtp);

/**
 * @route POST/api/auth/forgot-password
 * @description send an otp on user's email
 * @access Private
 */
authRouter.post('/forgotPassword', authLimiter, validate(emailSchema), authController.forgotPassword);

/**
 * @route POST/api/auth/verifyOTP
 * @description verifies the otp sent by user and generates reset token 
 * @access Private
 */

authRouter.post('/verifyOTP', authLimiter, validate(otpSchema), authController.verifyCode);

/**
 * @route POST/api/auth/changePassword
 * @description changes password if user has a reset token
 * @access Private
 */
authRouter.post('/changePassword', authController.changePassword);

/**
 * @route GET/api/auth/getMe
 * @description fetched the current user
 * @access private
 */
authRouter.get('/getMe',authMiddleware,authController.getMe)

export default authRouter;