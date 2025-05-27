import express from 'express';

import protectRoute from "../../middleware/usersAuthorizationJWT.js";

import {
    userControllerPutID,
    userControllerPutPassword
} from "../controllers/userControllerPut.js";

/**
 * A router instance created using Express.js `Router` method to handle PUT
 * requests for the user route. This variable is typically used to define and
 * group middleware and route handlers for processing HTTP PUT operations
 * associated with user-related endpoints.
 */
const userRoutePut = express.Router();

// PUT methods routes
// Update user by ID
userRoutePut.put('/api/v1/users/:id', protectRoute("user"), userControllerPutID);

// Update user password by ID
userRoutePut.put('/api/v1/users/change_password/:id/:password', protectRoute("user"), userControllerPutPassword);

export {userRoutePut};
