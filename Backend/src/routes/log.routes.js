import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import * as logController from "../controllers/log.controller.js"
const logRouter = Router();

/**
 * @route /api/log/server/:id
 * @description Gets log for user
 * @access private
 */
logRouter.get('/server/:id', authMiddleware,logController.getLogs);

export default logRouter;