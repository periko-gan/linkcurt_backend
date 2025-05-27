import express from 'express';

import protectRoute from "../../middleware/usersAuthorizationJWT.js";

import {
    userControllerDeleteID,
    userControllerDeleteParam
} from "../controllers/userControllerDelete.js";

/**
 * The userRouteDelete variable represents an instance of an Express Router
 * specifically designed for handling user-related DELETE requests.
 *
 * This router can be utilized to define and organize various user-related API
 * DELETE route handlers, allowing for modular and maintainable routing in
 * an application.
 */
const userRouteDelete = express.Router();

// DELETE methods routes
// Delete user by ID
userRouteDelete.delete('/api/v1/users/:id', protectRoute("user"), userControllerDeleteID);

// Delete user by params
userRouteDelete.delete('/api/v1/users/:attribute/:data', protectRoute("user"), userControllerDeleteParam);

export {userRouteDelete};
