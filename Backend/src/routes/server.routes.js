import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {roleMiddleware} from '../middleware/role.middleware.js'
import * as serverController from '../controllers/server.controller.js'
import { serverSchema,patchServerSchema } from '../validators/server.validators.js';
import { validate } from '../middleware/validation.middleware.js';

const serverRouter = Router();

/**
 * @route POST/api/server/createServer
 * @description it creates a server model
 * @access private
 */
serverRouter.post('/createServer',authMiddleware,validate(serverSchema), serverController.createServer);

/**
 * @route GET/api/server/getServers
 * @description it lists all the servers of the user.
 * @access private
 */
serverRouter.get('/getServers', authMiddleware, serverController.getServers);


/**
 * @route PATCH/api/server/update/:id
 * @description Updates Server settings
 * @access private
 */
serverRouter.patch('/update/:id',authMiddleware,validate(patchServerSchema),serverController.updateServer)

/**
 * @route DELETE/api/server/delete/:id
 * @description Deletes a server
 * @access Private
 */
serverRouter.delete('/delete/:id', authMiddleware, serverController.deleteServer)
/**
 * @route GET/api/server/check/:id
 * @description refresh check for server
 * @access private
 */
serverRouter.get('/check/:id', authMiddleware, serverController.checkServer)

/**
 * @route GET/api/server/update
 * @description it refreshes all the servers of a user
 * @access private
 */

serverRouter.get('/update', authMiddleware, serverController.refreshServers);

/**
 * @route GET/api/server/:id
 * @description Fetches detailed information of server.
 * @access private
 */
serverRouter.get('/:id', authMiddleware, serverController.fetchServer);


export default serverRouter;