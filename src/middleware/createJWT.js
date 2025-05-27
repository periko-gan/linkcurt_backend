import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Generates a JWT (JSON Web Token) for the given email.
 *
 * The function uses a secret key stored in the environment variable `TOKEN_SECRET`.
 * The token is signed with the provided email and an expiration time of 10 hours.
 *
 * @param {string} email - The email address to include as the payload in the JWT.
 * @returns {string} A signed JWT token.
 * @throws {Error} If the `TOKEN_SECRET` environment variable is undefined.
 */
export const generateToken = (email) => {
    const secretKey = process.env.TOKEN_SECRET; // Ensure this is set in your .env file
    return jwt.sign({email: email}, secretKey, {expiresIn: '10h'});
};
