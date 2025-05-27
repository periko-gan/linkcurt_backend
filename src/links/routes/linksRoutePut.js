import express from 'express';

import protectRoute from "../../middleware/usersAuthorizationJWT.js";

import {linkControllerPutID} from "../controllers/linksControllerPut.js";

/**
 * The `linksRoutePut` variable represents an Express Router instance.
 *
 * This router is typically used to define and group HTTP PUT route handlers
 * related to link operations into a modular and manageable structure.
 *
 * Example use cases for this router might include handling requests for:
 * - Updating existing link resources
 * - Partial modifications to link properties
 *
 * It provides the ability to keep route definitions organized and encapsulated
 * within a dedicated router module.
 */
const linksRoutePut = express.Router();

// PUT methods routes
// Update ilink by ID
linksRoutePut.put('/api/v1/links/:id', protectRoute("user"), linkControllerPutID);

export {linksRoutePut};
