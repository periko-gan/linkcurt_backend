import express from 'express';

import protectRoute from "../../middleware/usersAuthorizationJWT.js";

import {
    indexLinksVisitedControllerAllGet,
    linksVisitedController,
    linksVisitedControllerGetID,
    linksVisitedControllerGetIDAll,
    linksVisitedControllerGetParams,
    linksVisitedControllerGetParamsAll,
    linksVisitedSearchDateControllerGet,
    linkVisitedControllerGetCount,
    linkVisitedControllerGetCountAll,
    linksVisitedControllerGetByUserId,
} from '../controllers/linksVisitedControllerGet.js'

/**
 * `linksVisitedRouteGet` is an instance of an Express router object.
 * It is used to define and handle GET routes for the "links visited" functionality within the application.
 *
 * This router typically includes middleware, handlers, and route definitions
 * related to retrieving data about visited links.
 */
const linksVisitedRouteGet = express.Router();

// Show all links visited
linksVisitedRouteGet.get('/api/v1/linksvisited', protectRoute("admin"), linksVisitedController);

// Show all links visited with all users and links
linksVisitedRouteGet.get('/api/v1/linksvisited/all', protectRoute("admin"), indexLinksVisitedControllerAllGet);

// Show visited links by ID
linksVisitedRouteGet.get('/api/v1/linksvisited/:id', protectRoute("user"), linksVisitedControllerGetID);

// Show visited links by ID with all users and links
linksVisitedRouteGet.get('/api/v1/linksvisited/all/:id', protectRoute("user"), linksVisitedControllerGetIDAll);

// Show visited links with params
linksVisitedRouteGet.get('/api/v1/linksvisited/:attribute/:data', protectRoute("user"), linksVisitedControllerGetParams);

// Show visited links with params and all users and links
linksVisitedRouteGet.get('/api/v1/linksvisited/all/:attribute/:data', protectRoute("user"), linksVisitedControllerGetParamsAll);

// Show all visited links in range of date
linksVisitedRouteGet.get('/api/v1/linksvisited/date/:initialDate/:finalDate', protectRoute("user"), linksVisitedSearchDateControllerGet);

//Count links by user
linksVisitedRouteGet.get('/api/v1/count/id_user/:id_user/linksVisited', protectRoute("user"), linkVisitedControllerGetCount);

//Count all links
linksVisitedRouteGet.get('/api/v1/count/all/linksVisited', protectRoute("admin"), linkVisitedControllerGetCountAll);

// Get links visited by user ID
linksVisitedRouteGet.get('/api/v1/linksvisited/id_user/:id_user',  protectRoute("user"), linksVisitedControllerGetByUserId);

export {linksVisitedRouteGet};
