import express from 'express';

import protectRoute from "../../middleware/usersAuthorizationJWT.js";

import {userControllerCreate} from '../controllers/UserControllerPost.js';

/**
 * userRoutePost is an Express router used to define POST routes specific
 * to user-related operations within an application. This router handles
 * incoming HTTP POST requests directed toward user-specific functionality.
 *
 * It allows modular separation of concerns by organizing user-related
 * routes into a distinct router, enabling cleaner and more maintainable code.
 *
 * Typical use cases include creating new resources, such as user
 * registrations, or triggering other user-specific server-side behavior.
 *
 * @type {Router}
 */
const userRoutePost = express.Router();

userRoutePost.post('/api/v1/register', userControllerCreate);

export {userRoutePost};
