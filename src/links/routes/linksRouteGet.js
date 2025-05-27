import express from 'express';

import protectRoute from "../../middleware/usersAuthorizationJWT.js";

import {
    linksControllerAllGet,
    linksControllerGet,
    linksControllerGetID,
    linksControllerGetIDAll,
    linksControllerGetParams,
    linksControllerGetParamsAll,
    linksSearchDateControllerGet,
    linksControllerOriginalLinkGet,
    linkControllerGetCount,
    linkControllerGetCountAll,
} from '../controllers/linksControllerGet.js'


/**
 * A routing object created using the Express.js `Router` class.
 * This variable is utilized to define HTTP GET request routes related to links.
 * It is modular and can be used to handle link-related operations
 * within an Express application.
 */
const linksRouteGet = express.Router();

// GET methods routes
// Show all liks
linksRouteGet.get('/api/v1/links', protectRoute("admin"), linksControllerGet);

//show all links with all users and visited links
linksRouteGet.get('/api/v1/links/all', protectRoute("admin"), linksControllerAllGet);

//Return original link from short link
linksRouteGet.get('/api/v1/links/original/:shortLink',  linksControllerOriginalLinkGet);

// Show link by ID
linksRouteGet.get('/api/v1/links/:id', protectRoute("user"), linksControllerGetID);

// Show link by ID whit all users and visited links
linksRouteGet.get('/api/v1/links/all/:id', protectRoute("user"), linksControllerGetIDAll);

// Show link by ID whit params
linksRouteGet.get('/api/v1/links/:attribute/:data', linksControllerGetParams);

// Show link by ID whit params and all users and visited links
linksRouteGet.get('/api/v1/links/all/:attribute/:data', protectRoute("user"), linksControllerGetParamsAll);

// Show all links in range of date
linksRouteGet.get('/api/v1/links/date/:initialDate/:finalDate', protectRoute("user"), linksSearchDateControllerGet);

//Count links by user
linksRouteGet.get('/api/v1/count/id_user/:id_user/links', protectRoute("user"), linkControllerGetCount);

//Count all links
linksRouteGet.get('/api/v1/count/all/links', protectRoute("admin"), linkControllerGetCountAll);

export {linksRouteGet};
