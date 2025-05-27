import express from "express";

import protectRoute from "../../middleware/usersAuthorizationJWT.js";

import {linkControllerCreate} from "../controllers/linksControllerPost.js";

/**
 * The `linksRoutePost` variable is an instance of an Express Router.
 * It is used to define and handle POST route endpoints related to 'links'.
 * This router allows modular and organized route management by grouping
 * all POST requests for the specified resource under this router instance.
 *
 * The `linksRoutePost` can be mounted onto a specific path within the main
 * application to handle requests dealing with 'links' endpoints efficiently.
 *
 * Commonly utilized for:
 * - Handling new link creation requests.
 * - Managing POST actions related to 'links'.
 */
const linksRoutePost = express.Router();

linksRoutePost.post('/api/v1/createLinks', protectRoute("user"), linkControllerCreate);

export {linksRoutePost};
