import express from 'express';

import protectRoute from "../../middleware/usersAuthorizationJWT.js";

import {
    userControllerGet,
    userControllerGetAll,
    userControllerGetID,
    userControllerGetIDAll,
    userControllerGetParam,
    userControllerGetParamAll,
    userControllerGetCountAll,
} from '../controllers/UserControllerGet.js'

/**
 * Represents an instance of an Express Router for handling user-related routes.
 *
 * This router instance is intended to define and manage various endpoints and
 * middleware associated with user-specific functionality within the application.
 * It is used to separate user-related route logic from other parts of the application.
 *
 * @constant {Router} userRouteGet
 */
const userRouteGet = express.Router();

// GET methods routes
// Show all users
userRouteGet.get('/api/v1/users', protectRoute("admin"), userControllerGet);
// userRouteGet.get('/api/v1/users', userControllerGet);

// Show all users with all links and visited links
userRouteGet.get('/api/v1/users/all', protectRoute("admin"), userControllerGetAll);
// userRouteGet.get('/api/v1/users/all/', userControllerGetAll);

// Show user by ID
userRouteGet.get('/api/v1/users/:id', protectRoute("user"), userControllerGetID);

// Show user by ID with all links and visited links
userRouteGet.get('/api/v1/users/all/:id', protectRoute("user"), userControllerGetIDAll);

// Show user by params
userRouteGet.get('/api/v1/users/:attribute/:data', protectRoute("user"), userControllerGetParam);

// Show user by params with all links and visited links
userRouteGet.get('/api/v1/users/all/:attribute/:data', protectRoute("user"), userControllerGetParamAll);

//Count all links
userRouteGet.get('/api/v1/count/all/users', protectRoute("admin"), userControllerGetCountAll);

export {userRouteGet};
