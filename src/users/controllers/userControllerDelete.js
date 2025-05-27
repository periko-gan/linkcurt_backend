import {UsersModel} from "../../models/model.js";


/**
 * Deletes a user from the database based on the provided user ID in the request parameters.
 *
 * Validates that the `id` parameter is a valid number before proceeding. If the ID is invalid,
 * a 400 Bad Request response is sent. If the user corresponding to the given ID is not found,
 * a 404 Not Found response is returned. If the user is successfully deleted, a 200 OK response
 * is sent with the deleted user information (excluding the password) and a success message.
 *
 * If an unexpected error occurs during execution, a 500 Internal Server Error response is sent
 * with the error message.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the user to be deleted.
 *
 * @returns {void}
 */
export const userControllerDeleteID = async (req, res) => {
    try {

        const { id } = req.params;

        if(isNaN(Number(id))) {
            return res.status(400).send({
                ok: false,
                error: "ID has to be a number"
            });
        }

        const user = await UsersModel.findOne({
            where: {
                id_user: req.params.id
            },
            attributes: { exclude: ['password'] }
        });

        if (user) {
            await user.destroy();
            res.status(200).send({
                ok: true,
                user: user,
                message: "User deleted"
            });
        } else {
            res.status(404).send({
                ok: false,
                error: "User not found with id " + req.params.id
            });
        }
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        });
    }
}


/**
 * Handles the deletion of a user based on a specified attribute.
 *
 * The function validates the provided attribute to ensure it is either 'email', 'name', or 'id_user'.
 * If an invalid attribute is provided, a 400 Bad Request response is returned.
 * If a user matching the specified attribute and value is found, the user is deleted.
 * In case no user is found, a 404 Not Found response is returned.
 * If an error occurs during the process, a 500 Internal Server Error response is returned.
 *
 * @param {object} req - The request object containing the HTTP request information.
 * @param {object} req.params - The parameters sent in the request URL.
 * @param {string} req.params.attribute - The user attribute (e.g., 'email', 'name', or 'id_user') used for identifying the user.
 * @param {string} req.params.data - The value of the attribute used for identifying the user.
 * @param {object} res - The response object used to send HTTP responses.
 *
 * @returns {void} Sends an HTTP response based on the outcome:
 * - 200 OK response with the deleted user information if successful.
 * - 400 Bad Request response if the attribute provided is invalid.
 * - 404 Not Found response if no user matching the criteria is found.
 * - 500 Internal Server Error response if an exception occurs.
 */
export const userControllerDeleteParam = async (req, res) => {

    const attribute = req.params.attribute;
    const data = req.params.data;

    if (attribute !== "email" && attribute !== "name" && attribute !== "id_user") {
        res.status(400).send({
            ok: false,
            error: "Invalid attribute. You can use only 'email', 'name' or 'id_user'"
        });
        return;
    }

    try {
        const user = await UsersModel.findOne({
            where: {
                [attribute]: data
            },
            attributes: { exclude: ['password'] }
        });

        if (user) {
            await user.destroy();
            res.status(200).send({
                ok: true,
                user: user,
                message: "User deleted"
            });
        } else {
            res.status(404).send({
                ok: false,
                error: "User not found with this " + attribute + ": " + data
            });
        }
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error
        });
    }
};
