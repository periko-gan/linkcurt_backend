import validator from 'validator'

import { LinksModel, LinksVisitedModel, UsersModel } from '../../models/model.js'

// GET methods routes
/**
 * Handles the HTTP GET request to retrieve all user records from the database.
 * Excludes the password attribute for security purposes.
 * Responds with a list of users and a success status.
 * In case of an error, responds with a failure status and an error message.
 *
 * @async
 * @function userControllerGet
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} An HTTP response containing the list of users or an error message.
 */
export const userControllerGet = async (req, res) => {

    try {
        const users = await UsersModel.findAll({
            attributes: { exclude: ['password'] }
        })
        res.status(200).send({
            ok: true,
            users: users
        })
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        })
    }
}

/**
 * Handles the retrieval of all user records along with associated models.
 *
 * Fetches all users from the database using the `UsersModel`. Includes related models `LinksModel`
 * and `LinksVisitedModel` for joined data. Excludes sensitive user data such as password from the response.
 * Sends the retrieved data as a response or handles errors occurred during the process.
 *
 * @async
 * @function userControllerGetAll
 * @param {Object} req - The request object containing information about the HTTP request.
 * @param {Object} res - The response object used to send the HTTP response.
 */
export const userControllerGetAll = async (req, res) => {
    try {
        const users = await UsersModel.findAll({
            include: [{
                model: LinksModel
            }, {
                model: LinksVisitedModel
            }],
            attributes: { exclude: ['password'] }
        })
        res.status(200).send({
            ok: true,
            users: users
        })
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        })
    }
}

/**
 * Handles the retrieval of a user by their ID from the database.
 *
 * This asynchronous function queries the `UsersModel` database for a user matching the specified ID
 * provided in the request parameters. It excludes the `password` attribute from the returned data
 * for security purposes. If a matching user is found, it sends a JSON response with the user details
 * and a 200 status code. If the user is not found, it returns a 404 error with an appropriate message.
 * In case of server or database errors, it sends a 500 status code with the error details.
 *
 * @param {Object} req - The request object containing the parameters and body.
 * @param {Object} res - The response object used to send the HTTP response.
 * @throws {Error} Returns a 500 status and the error message if there is a server-side issue.
 */
export const userControllerGetID = async (req, res) => {

    try {
        const user = await UsersModel.findOne({
            where: {
                id_user: req.params.id
            },
            attributes: { exclude: ['password'] }
        })
        if (user) {
            res.status(200).send({
                ok: true,
                users: user
            })
        } else {
            res.status(404).send({
                ok: false,
                error: 'User not found with id ' + req.params.id
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
 * Handles user retrieval by ID with associated data.
 *
 * This asynchronous function fetches a user's information from the database
 * based on the provided user ID in the request parameters. The returned user
 * object excludes sensitive attributes such as the password and includes
 * associated links and visited links if available.
 *
 * On success, the response contains user data and a status of 200. If the user
 * is not found, it responds with a 404 status and an error message. In the
 * event of an internal server error, a 500 response with the error details is sent.
 *
 * @param {object} req - The request object containing the route parameters.
 * @param {object} res - The response object used for sending the response.
 */
export const userControllerGetIDAll = async (req, res) => {
    try {
        const user = await UsersModel.findOne({
            where: {
                id_user: req.params.id
            },
            attributes: { exclude: ['password'] },
            include: [{
                model: LinksModel,
                required: false
            }, {
                model: LinksVisitedModel,
                required: false
            }]
        })
        if (user) {
            res.status(200).send({
                ok: true,
                users: user
            })
        } else {
            res.status(404).send({
                ok: false,
                error: 'User not found with id ' + req.params.id
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
 * Asynchronous function to handle a GET request for retrieving user data based on a specific attribute.
 *
 * This function processes the request to fetch user information filtered by one of the supported attributes.
 * The supported attributes are `'email'`, `'name'`, `'id_user'`, `'b_date'`, and `'role'`.
 *
 * If the provided attribute or data is invalid, an appropriate error response is sent.
 * Validations for specific attributes, such as email format, are enforced.
 * The function queries the database using the provided attribute and value to find matching users.
 * If the query is successful and users are found, the data is returned excluding sensitive information,
 * like `password`. Otherwise, error responses are returned for invalid inputs or issues during the query process.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @property {Object} req.params - Contains the request parameters.
 * @property {string} req.params.attribute - The attribute name used to filter user data (e.g., `email`).
 * @property {string} req.params.data - The value of the attribute for filtering user data.
 * @property {Function} res.status - A function to set the HTTP response status code.
 * @property {Function} res.send - A function to send the response to the client.
 */
export const userControllerGetParam = async (req, res) => {

    const attribute = req.params.attribute.trim()
    const data = req.params.data.trim()

    if (attribute !== 'email' && attribute !== 'name' && attribute !== 'id_user' && attribute !== 'b_date' && attribute !== 'role') {
        res.status(400).send({
            ok: false,
            error: 'Invalid attribute. You can use only \'email\', \'name\' or \'id_user\' or \'b_date\''
        })
        return
    }

    if (attribute === 'email') {
        if (!validator.isEmail(data)) {
            return res.status(400).send({
                ok: false,
                error: 'Invalid email format'
            });
        }
    }

    try {
        const user = await UsersModel.findAll({
            where: {
                [attribute]: data
            },
            attributes: { exclude: ['password'] },
        })
        if (user) {
            res.status(200).send({
                ok: true,
                users: user
            })
        } else {
            res.status(404).send({
                ok: false,
                error: 'User not found with this ' + attribute + ': ' + data
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
 * Handles a request to retrieve users based on specific attributes and validates the input before querying the database.
 *
 * @async
 * @function userControllerGetParamAll
 * @param {Object} req - The request object containing parameters and other data.
 * @param {Object} req.params - The parameters passed in the request.
 * @param {string} req.params.attribute - The attribute to filter users by. Must be one of: 'email', 'name', 'id_user', 'b_date', or 'role'.
 * @param {string} req.params.data - The value associated with the specified attribute.
 * @param {Object} res - The response object used to send responses to the client.
 * @returns {void} Sends an HTTP response containing the user data if found or an appropriate error message.
 *
 * @throws {Error} Returns a `500` HTTP response in case of an error during database operations.
 *
 * Response Details:
 * - If the attribute is invalid, sends a `400` status with an error message.
 * - If the attribute is 'email', validates the email format and sends a `400` status if the format is invalid.
 * - If a matching user is found, sends a `200` status with the user data excluding the password.
 * - If no matching user is found, sends a `404` status with an appropriate error message.
 * - For server errors, sends a `500` status with the error message.
 */
export const userControllerGetParamAll = async (req, res) => {

    const attribute = req.params.attribute
    const data = req.params.data

    if (attribute !== 'email' && attribute !== 'name' && attribute !== 'id_user' && attribute !== 'b_date' && attribute !== 'role') {
        res.status(400).send({
            ok: false,
            error: 'Invalid attribute. You can use only \'email\', \'name\' or \'id_user\' or \'b_date\''
        })
        return
    }

    if (attribute === 'email') {
        if (!validator.isEmail(data)) {
            return res.status(400).send({
                ok: false,
                error: 'Invalid email format'
            });
        }
    }

    try {
        const user = await UsersModel.findAll({
            where: {
                [attribute]: data
            },
            attributes: { exclude: ['password'] },
            include: [{
                model: LinksModel,
                required: false
            }, {
                model: LinksVisitedModel,
                required: false
            }]
        })
        if (user) {
            res.status(200).send({
                ok: true,
                users: user
            })
        } else {
            res.status(404).send({
                ok: false,
                error: 'User not found with this ' + attribute + ': ' + data
            })
        }
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        })
    }
}

// Count all links
/**
 * Handles the request to count all user records in the UsersModel collection.
 *
 * This asynchronous function receives a request and response object, processes the count of
 * all records in the UsersModel database, and sends a response with the result or an error message.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.params - The parameters included in the request URL.
 * @param {string} req.params.id_user - The user ID extracted from the request parameters.
 * @param {Object} res - The HTTP response object.
 */
export const userControllerGetCountAll = async (req, res) => {
    try {
        // Extrae el id_user de los parámetros de la petición
        const { id_user } = req.params;

        // Cuenta el número de registros que coinciden con el id_user
        const count = await UsersModel.count();

        // Devuelve la respuesta exitosa con el conteo
        res.status(200).send({
            ok: true,
            count: count
        });
    } catch (error) {
        // Manejo de errores
        res.status(500).send({
            ok: false,
            error: error.message
        });
    }
}
