import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import {UsersModel} from '../models/model.js';

// Get config vars
dotenv.config();

/**
 * Middleware function to protect routes by validating user authorization.
 *
 * @param {string} role - Specifies the required role for accessing the route. Accepts "user", "admin", or an empty string.
 * @returns {Function} - An asynchronous middleware function that verifies the user's authentication and authorization based on the provided role.
 *
 * The middleware checks for an authorization token in the headers of the incoming request. If the token is valid, it verifies
 * the user's role against the specified role requirement:
 * - Allows access to "user" routes for both "user" and "admin" roles.
 * - Allows access to "admin" routes only for users with "admin" roles.
 *
 * If the user is unauthorized, the middleware sends a response indicating the appropriate error, such as "Unauthorized user"
 * or "User not found". If there is no token provided and the role requirement is not empty, it denies access.
 */
let protectRoute = (role) => {
    return async (req, res, next) => {

        let token = req.headers['authorization'];

        if (token) {
            // We omit the "Bearer " part
            token = token.substring(7);
            try {
                // Verify the token
                let result = jwt.verify(token, process.env.TOKEN_SECRET);

                // Search for the email stored in the token and bring the user data
                let user = await UsersModel.findOne({
                    where: {email: result.email}
                });

                // Check if the user is admin and let it continue.
                if (user) {
                    // Check if the user is user or admin and let it continue.
                    //This allows an admin user to also see the routes of the user user
                    if (role === "user" && (user.role === "user" || user.role === "admin")) {
                        return next();
                    }

                    // Check if the user is admin and let it continue.
                    if (role === "admin" && user.role === "admin") {
                        return next();
                    }

                    return res.status(401).send({
                        ok: false,
                        error: "Unauthorized user"
                    });

                } else {
                    res.status(400).send({
                        ok: false,
                        error: "User not found"
                    });
                }

            } catch (error) {
                res.status(401).send({
                    ok: false,
                    message: error.message
                });
            }
        } else {
            if (role === "") {
                next();
            } else {
                res.status(401).send({
                    ok: false,
                    error: "Unauthorized user"
                });
            }
        }
    }
};

export default protectRoute;
