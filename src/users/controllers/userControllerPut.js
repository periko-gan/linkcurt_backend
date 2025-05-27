import bcrypt from 'bcryptjs'

import { UsersModel } from '../../models/model.js'

import { emailVerification } from '../../helpers/emailVerification.js'

/**
 * Updates a user's information based on the provided ID.
 *
 * This asynchronous function handles updating user data such as email, name, and birth date.
 * Various validations are performed to ensure the provided data is in the correct format.
 * Upon successful update, the user information is returned; otherwise, appropriate error messages
 * are sent in the response.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - Contains the fields `email`, `name`, and `b_date` to update the user.
 * @param {string} req.body.email - The new email address for the user. Verified for valid email format.
 * @param {string} req.body.name - The new name for the user. Must have more than 3 characters.
 * @param {string} req.body.b_date - The new birth date for the user. Validated for proper date format.
 * @param {Object} req.params - Contains path parameters for the request.
 * @param {string} req.params.id - The unique identifier of the user to be updated.
 * @param {Object} res - The response object.
 *
 * @returns {Promise<void>} Does not return anything explicitly. Sends a response to the client.
 *
 * @throws {Error} Responds with a status code 500 and error message in case of server errors.
 */
export const userControllerPutID = async (req, res) => {

    let { email, name, b_date } = req.body

    // Check the name length
    if (name.length <= 3) {
        return res.status(400).send({
            ok: false,
            error: 'Nickname must have more than 3 characters'
        })
    }

    // Check if the b_date is valid
    if (b_date) {
        const date = new Date(`${b_date}T00:00:00`)
        if (isNaN(date)) {
            return res.status(400).send({
                ok: false,
                error: 'Invalid date format'
            })
        }
    }

    // Check if the email is valid
    if (email) {
        if (!emailVerification(email)) {
            res.status(400).send({
                ok: false,
                error: 'Invalid email format'
            })
            return
        }
    }

    try {
        const user = await UsersModel.findOne({
            where: {
                id_user: req.params.id
            },
            attributes: { exclude: ['password'] }
        })

        if (user) {
            await user.update(req.body)
            res.status(200).send({
                ok: true,
                user: user,
                message: 'User updated'
            })
        } else {
            res.status(404).send({
                ok: false,
                error: 'User not found with this id'
            })
        }
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        })
    }
}

/**
 * Handles updating a user's password.
 *
 * This function processes a request to update the password of a specific user identified by their ID.
 * The function performs the following:
 * - Validates that the provided password meets the required criteria (minimum length of 8 characters).
 * - Checks if the new password is different from the user's current password.
 * - If validation passes, it hashes the new password and updates the user record in the database.
 * - Sends appropriate success or error responses based on the outcome of the operations.
 *
 * @param {Object} req - The HTTP request object, containing the user ID under `req.body.id` and the new plaintext password under `req.body.password`.
 * @param {Object} res - The HTTP response object used to send back the results of the operation.
 *
 * Possible Response Statuses:
 * - 200: Password updated successfully. Returns an object with `ok: true`, updated user information, and a success message.
 * - 400: Validation error (e.g., password too short, new password same as old password). Returns an object with `ok: false` and an error message.
 * - 404: Specified user ID not found. Returns an object with `ok: false` and an error message.
 * - 500: Internal server error. Returns an object with `ok: false` and the error message.
 */
export const userControllerPutPassword = async (req, res) => {
    let id = req.body.id
    let plainPassword = req.body.password

    if (plainPassword.length < 8) {
        res.status(400).send({
            ok: false,
            error: 'The password must have at least 8 characters'
        })
        return
    }

    try {
        const user = await UsersModel.findOne({
            where: {
                id_user: id
            }
        })

        // check if the password is equal to the previous one
        const isSamePassword = await bcrypt.compare(plainPassword, user.password)

        if (isSamePassword) {
            res.status(400).send({
                ok: false,
                error: 'The new password cannot be the same as the previous one'
            })
            return
        }

        if (user) {
            // Hash the password
            const hashedPassword = await bcrypt.hash(plainPassword, 10)

            await user.update({ password: hashedPassword })
            res.status(200).send({
                ok: true,
                user: user,
                message: 'User password updated'
            })
        } else {
            res.status(404).send({
                ok: false,
                error: 'User not found with this id'
            })
        }
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        })
    }
}
