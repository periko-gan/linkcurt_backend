import express from 'express';

import protectRoute from "../../middleware/usersAuthorizationJWT.js";

import {linkControllerDeleteID} from "../controllers/linksControllerDelete.js";

/**
 * The `linkRouteDelete` variable is an instance of an Express Router.
 * It is used to define middleware and route handlers for the delete-related operations
 * associated with links.
 *
 * This router provides an organized way to manage the routing logic specifically
 * for handling deletion routes related to links.
 */
const linkRouteDelete = express.Router();

// DELETE methods routes
// Delete link by ID
linkRouteDelete.delete('/api/v1/links/:id', protectRoute("user"), linkControllerDeleteID);

export {linkRouteDelete};
