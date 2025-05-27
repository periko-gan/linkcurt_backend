import express from "express";

import protectRoute from "../../middleware/usersAuthorizationJWT.js";

import {linkVisitedControllerDeleteID} from "../controllers/linksVisitedCotrollerDelete.js";

/**
 * The `linksVisitedRoutePost` variable is an instance of an Express Router.
 * It is used to define middleware and route handlers related to processing
 * POST requests for the "links visited" route in the application.
 *
 * This Router allows for segregating the route handling logic, enhancing
 * modularity and maintainability of the codebase. All routes defined on
 * this router will specifically handle HTTP POST requests targeted at
 * "links visited" endpoints.
 *
 * This variable is typically used to organize request-response logic
 * and is likely mounted on a specific path within a larger Express application.
 */
const linksVisitedRoutePost = express.Router();

linksVisitedRoutePost.delete('/api/v1/linksvisited/:id', protectRoute("user"), linkVisitedControllerDeleteID);

export {linksVisitedRoutePost};
