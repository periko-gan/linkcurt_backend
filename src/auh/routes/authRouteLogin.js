import express from "express";

import {authControllerLogin} from "../controllers/authControllerLogin.js";

/**
 * The `loginRouter` variable is an instance of Express Router.
 * It is used to define and organize route handlers related to user login functionality.
 * This router can contain middleware and endpoints specific to login operations,
 * such as handling user authentication, managing login requests, and processing session creation.
 *
 * Typically, this router is invoked or mounted in the main application file or another modular route file
 * to manage the application's login features efficiently and in a decoupled manner.
 */
const loginRouter = express.Router();

loginRouter.post('/api/v1/login', authControllerLogin);

export {loginRouter};
