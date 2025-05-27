import express from 'express';

import {linkVisitedControllerCreate} from "../controllers/linkVisitedControllerPost.js";

/**
 * Represents an instance of an express Router object used for handling routes
 * related to visited links.
 *
 * The `linkVisitedRoutePost` variable serves as a dedicated routing module
 * for processing HTTP POST requests associated with visited links. It allows
 * the encapsulation of route logic and middleware for related endpoints.
 *
 * It can be mounted onto a parent application or router to handle specific
 * URL patterns.
 */
const linkVisitedRoutePost = express.Router();

// Route to create a new link visited entry
linkVisitedRoutePost.post('/api/v1/linksVisited', linkVisitedControllerCreate);

export {linkVisitedRoutePost};
