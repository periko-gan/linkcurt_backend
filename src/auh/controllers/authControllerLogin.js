import bcrypt from "bcryptjs";

import {UsersModel} from '../../models/model.js';
import {generateToken} from "../../middleware/createJWT.js";
import validator from 'validator'


/**
 * Handles the login process for a user by validating credentials and generating an authentication token.
 *
 * This function performs the following steps:
 * 1. Extracts the email and password from the incoming request body.
 * 2. Validates the email format; if invalid, a 400 response is sent.
 * 3. Searches for a user with the provided email in the database.
 * 4. If no user is found, a 400 response is sent with an invalid credentials error.
 * 5. Compares the hashed password in the database with the plain password from the request using bcrypt.
 * 6. If the password comparison succeeds, generates an authentication token and sends a 200 response with user details and a success message.
 * 7. If the password comparison fails, a 400 response is sent with an invalid credentials error.
 * 8. Handles any server errors by sending a 500 response with the error message.
 *
 * @param {Object} req - The HTTP request object containing user email and password in the body.
 * @param {Object} res - The HTTP response object used to send back the appropriate response.
 */
export const authControllerLogin = async (req, res) => {

    let email = req.body.email;
    let plainPassword = req.body.password;

    validator.isEmail((email.trim())
        ? email = email
        : res.status(400).send(
            {
                ok: false,
                error: "Invalid email format"
            }
        ))

    try {
        const user = await UsersModel.findOne({
            where: {
                email: email
            }
        });

      if (!user) {
        return res.status(400).send({
          ok: false,
          error: "Invalid email or password"
        });
      }

        if (bcrypt.compareSync(plainPassword, user.password)) {

            return res.status(200).send(
                {
                    ok: true,
                    token: generateToken(email),
                    user: {
                        id_user: user.id_user,
                        email: user.email,
                        name: user.name,
                        r_date: user.r_date,
                        b_date: user.b_date,
                        role: user.role
                    },
                    message: "Login successful"
                }
            )
        } else {
            return res.status(400).send(
                {
                    ok: false,
                    error: "Invalid email or password"
                }
            )
        }

    } catch (error) {
        res.status(500).send({error: error.message});
    }
};
