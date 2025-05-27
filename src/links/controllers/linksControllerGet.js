import { LinksModel, LinksVisitedModel, UsersModel } from '../../models/model.js';
import { Op } from 'sequelize';

// Show all links
/**
 * Handles the retrieval of all links from the database.
 *
 * This asynchronous function queries the database to fetch all available
 * link records using the LinksModel, returning them in the response.
 * In case of an error during the operation, an error message with a 500
 * status code is sent in the response.
 *
 * @param {Object} req - The request object representing the incoming HTTP request.
 * @param {Object} res - The response object used to send the HTTP response.
 * @returns {Promise<void>} Sends a JSON response containing either the retrieved links or an error message.
 */
export const linksControllerGet = async (req, res) => {
    try {
        const links = await LinksModel.findAll()

        res.status(200).send({
            ok: true,
            links: links
        })
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        })
    }
}

// Show all links in range of date
/**
 * Handles the retrieval of links within a specified date range.
 *
 * This asynchronous function fetches links from the database that fall within the date range provided
 * in the request parameters. The response includes a list of matching links or an appropriate error message
 * for invalid date formats or server-side issues.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.initialDate - The start date of the range in the YYYY-MM-DD format.
 * @param {string} req.params.finalDate - The end date of the range in the YYYY-MM-DD format.
 * @param {Object} res - The response object used to send back HTTP responses.
 *
 * @throws {Error} Returns a status 400 if the provided date format is invalid.
 * @throws {Error} Returns a status 500 if a server-side error occurs during operation.
 */
export const linksSearchDateControllerGet = async (req, res) => {

    const initialDate = new Date(`${req.params.initialDate}T00:00:00`)
    const finalDate = new Date(`${req.params.finalDate}T23:59:59`)

    try {

        if (isNaN(initialDate.getTime()) || isNaN(finalDate.getTime())) {
            return res.status(400).send({
                ok: false,
                error: 'Invalid date format. Use YYYY-MM-DD.'
            })
        }

        const links = await LinksModel.findAll({
            where: {
                registration_date_links: {
                    [Op.between]: [initialDate, finalDate]
                }
            }
        })

        res.status(200).send({
            ok: true,
            links: links
        })
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        })
    }

}

/**
 * Handles the retrieval of all links with associated user and visitation information.
 *
 * This asynchronous function queries the database to fetch all links stored in the
 * `LinksModel`. Each link record includes associated user information from the
 * `UsersModel` (excluding the password property) and visitation data from the
 * `LinksVisitedModel`.
 *
 * On a successful query, it returns a response with a status code of 200 and a JSON
 * object containing the information about the links. If an error occurs during the process,
 * it returns a status code of 500 with an error message.
 *
 * @async
 * @function linksControllerAllGet
 * @param {Object} req - The request object provided by the Express framework.
 * @param {Object} res - The response object provided by the Express framework.
 */
// Show all links with all users and visited links
export const linksControllerAllGet = async (req, res) => {
    try {

        const links = await LinksModel.findAll({
            include: [
                {
                    model: UsersModel,
                    attributes: { exclude: ['password'] }
                },
                { model: LinksVisitedModel }
            ]
        })

        res.status(200).send({
            ok: true,
            links: links
        })
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        })
    }
}


// Show original link from short link
/**
 * Controller function to retrieve the original link associated with a given short link.
 *
 * This method extracts the `shortLink` parameter from the request, sanitizes it by removing
 * any prefix related to "http://linkcurter.com/" or "https://linkcurter.com/", and searches
 * the database for a corresponding original link. If a match is found, the original link is
 * returned as part of the response. If no match is found, a 404 status is sent. In case of any
 * server error, a 500 status is sent with the error message.
 *
 * @param {Object} req - The HTTP request object, containing parameters in `req.params`.
 * @param {Object} res - The HTTP response object used to send the result of the operation.
 * @returns {void} This function sends a JSON response with the result of the operation.
 *
 * Possible Responses:
 * - Status 200: Sends an object with `ok: true` and the matched `original_link`.
 * - Status 404: Sends an object with `ok: false` and an error message if the short link is not found.
 * - Status 500: Sends an object with `ok: false` and an error message in case of a server error.
 */
export const linksControllerOriginalLinkGet= async (req, res) => {
    try {
        // const shortLink = req.params.shortLink

        //todo los short_lin solo los quede

        const shortLink = req.params.shortLink.replace(/^https?:\/\/linkcurter\.com\//, '');


        const links = await LinksModel.findOne({
            where: {
                short_link: shortLink
            }
        })

        // Check if the short_link exists
        if (!links) {
            return res.status(404).send({
                ok: false,
                error: 'Short link not found'
            })
        }

        if (links) {
            res.status(200).send({
                ok: true,
                original_link: links.original_link
            })
        } else {
            res.status(404).send({
                ok: false,
                error: 'Link not found with this id'
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
 * Asynchronously retrieves a specific link from the database by its ID.
 *
 * @param {Object} req - The request object containing client request data.
 * @param {Object} req.params - The parameters from the request URL.
 * @param {string} req.params.id - The ID of the link to retrieve.
 * @param {Object} res - The response object used to send data or errors back to the client.
 * @returns {void} Sends a JSON response containing the link data if found, or an error message if not found or if an error occurs.
 *
 * If a link is found with the specified ID:
 *   - Responds with a status code 200.
 *   - Includes the link data in the response.
 *
 * If no link is found with the specified ID:
 *   - Responds with a status code 404.
 *   - Includes an error message indicating the link was not found.
 *
 * If an error occurs during the database operation:
 *   - Responds with a status code 500.
 *   - Includes an error message describing the issue.
 */

// Show link by ID
export const linksControllerGetID = async (req, res) => {

    try {
        const links = await LinksModel.findOne({
            where: {
                id_links: req.params.id
            }
        })
        if (links) {
            res.status(200).send({
                ok: true,
                links: links
            })
        } else {
            res.status(404).send({
                ok: false,
                error: 'Link not found with this id'
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
 * Asynchronous function to retrieve a specific link by its ID from the database along with related user and visit information.
 *
 * The function interacts with the database models `LinksModel`, `UsersModel`, and `LinksVisitedModel` to fetch the link's details.
 *
 * Includes the following:
 * - The `UsersModel` is joined while excluding sensitive attributes such as `password`.
 * - Links visited information from `LinksVisitedModel` is also retrieved.
 *
 * Sends an HTTP response with the following scenarios:
 * - Status 200: When the link with the specified ID is successfully found. Returns the link's data.
 * - Status 404: When no link is found with the specified ID. Returns an error message.
 * - Status 500: When an exception occurs during the operation. Returns an error message with exception details.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} req.params - Parameters from the URL.
 * @param {string} req.params.id - The ID of the link to retrieve.
 * @param {object} res - The HTTP response object.
 *
 * @returns {void} Sends an HTTP response with the operation result.
 */
// Show link by ID whit all users and visited links

export const linksControllerGetIDAll = async (req, res) => {

    try {
        const links = await LinksModel.findOne({
            where: {
                id_links: req.params.id
            },
            include: [
                {
                    model: UsersModel,
                    attributes: { exclude: ['password'] }
                },
                { model: LinksVisitedModel }
            ]
        })
        if (links) {
            res.status(200).send({
                ok: true,
                links: links
            })
        } else {
            res.status(404).send({
                ok: false,
                error: 'Link not found with this id'
            })
        }
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        })
    }
}

// Show link by params
/**
 * Handles GET requests to retrieve links based on a specified attribute and its value.
 * This function interacts with the LinksModel to fetch records from the database.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Parameters of the request.
 * @param {string} req.params.attribute - The attribute to filter the links on.
 * @param {string} req.params.data - The value of the attribute to match.
 * @param {Object} res - Express response object.
 * @throws Will send a 500 status code if an internal server error occurs.
 * @returns {void} Sends a JSON response containing the links found or an error message.
 */
export const linksControllerGetParams = async (req, res) => {

    const attribute = req.params.attribute
    const data = req.params.data

    try {
        const links = await LinksModel.findAll({
            where: {
                [attribute]: data
            }
        })
        if (links) {
            res.status(200).send({
                ok: true,
                links: links
            })
        } else {
            res.status(404).send({
                ok: false,
                error: 'Link not found'
            })
        }
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        })
    }
}

// Show link by params and all users and visited links
/**
 * Fetches all links from the database that match a specific attribute and value, including related user and visited link data.
 *
 * @async
 * @function linksControllerGetParamsAll
 * @param {Object} req - The request object containing route parameters.
 * @param {Object} req.params - Parameters passed in the URL.
 * @param {string} req.params.attribute - The attribute to filter the links by.
 * @param {string} req.params.data - The value of the attribute to filter the links by.
 * @param {Object} res - The response object used to send the HTTP response.
 * @returns {void} Sends an HTTP response with the matching links or an error message.
 * @throws {Error} Returns an error response with status 500 in case of a server error.
 */
export const linksControllerGetParamsAll = async (req, res) => {

    const attribute = req.params.attribute
    const data = req.params.data

    try {
        const links = await LinksModel.findAll({
            where: {
                [attribute]: data
            },
            include: [
                {
                    model: UsersModel,
                    attributes: { exclude: ['password'] }
                },
                { model: LinksVisitedModel }
            ]
        })
        if (links) {
            res.status(200).send({
                ok: true,
                links: links
            })
        } else {
            res.status(404).send({
                ok: false,
                error: 'Link not found'
            })
        }
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        })
    }
}

// Count links by user
/**
 * Handles a request to count the number of links associated with a specific user ID.
 *
 * This asynchronous controller function extracts the `id_user` parameter from the request,
 * queries the database to count the number of records matching the provided `id_user`, and
 * returns the count in the response. If an error occurs during the process, an error response
 * with a status code of 500 is sent.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.params - The parameters included in the request.
 * @param {string} req.params.id_user - The ID of the user for whom the count of links should be retrieved.
 * @param {Object} res - The HTTP response object used to send back the results or an error.
 */
export const linkControllerGetCount = async (req, res) => {
    try {
        // Extrae el id_user de los parámetros de la petición
        const { id_user } = req.params;

        // Cuenta el número de registros que coinciden con el id_user
        const count = await LinksModel.count({
            where: {
                id_user: id_user
            }
        });

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

// Count all links
/**
 * Retrieves the total count of records from the LinksModel based on the specified user ID.
 *
 * This function extracts the `id_user` parameter from the request, counts the number of records
 * within the LinksModel database, and sends a response with the count. If an error occurs during
 * the process, it returns an error response with the respective message.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.params - The parameters of the HTTP request.
 * @param {string} req.params.id_user - The ID of the user whose records are being counted.
 * @param {Object} res - The HTTP response object used to send the response back to the client.
 *
 * @throws {Error} Returns a 500 internal server error response if the operation fails.
 */
export const linkControllerGetCountAll = async (req, res) => {
    try {
        // Extrae el id_user de los parámetros de la petición
        const { id_user } = req.params;

        // Cuenta el número de registros que coinciden con el id_user
        const count = await LinksModel.count();

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
