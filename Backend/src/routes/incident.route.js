import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js';
import * as incidentController from '../controllers/incident.controller.js'

const incidentRouter = Router();

/**
 * @route GET/api/incidents/server/:id
 * @description Shows all the incidents related to that particular server
 * @access Private
 */
incidentRouter.get('/server/:id', authMiddleware, incidentController.getIncidents);
export default incidentRouter;
