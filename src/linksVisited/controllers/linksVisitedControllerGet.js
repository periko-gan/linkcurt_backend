import {LinksModel, LinksVisitedModel, UsersModel} from "../../models/model.js";
import {Op} from "sequelize";


/**
 * Handles HTTP requests to retrieve all links visited.
 *
 * This asynchronous controller fetches all entries
 * from the LinksVisitedModel and returns them in the response.
 *
 * On success, it sends a response with status 200 containing a list
 * of visited links. On failure, it sends a response with status 500
 * and an error message.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
export const linksVisitedController = async (req, res) => {
    try {

        const linksVisited = await LinksVisitedModel.findAll();

        res.status(200).send({
            ok: true,
            linksVisited: linksVisited
        });

    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        });
    }
};

/**
 * Fetches and returns the list of links visited within a specified date range.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.initialDate - The start date for the search in YYYY-MM-DD format.
 * @param {string} req.params.finalDate - The end date for the search in YYYY-MM-DD format.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} Resolves with the HTTP response containing the list of visited links or an error message.
 *
 * @throws {Object} 400 Error - If the specified date format is invalid.
 * @throws {Object} 500 Error - If there is an internal server error.
 */
export const linksVisitedSearchDateControllerGet = async (req, res) => {

    const initialDate = new Date(`${req.params.initialDate}T00:00:00`);
    const finalDate = new Date(`${req.params.finalDate}T23:59:59`);

    try {

        if (isNaN(initialDate.getTime()) || isNaN(finalDate.getTime())) {
            return res.status(400).send({
                ok: false,
                error: "Invalid date format. Use YYYY-MM-DD."
            });
        }

        const linksVisited = await LinksVisitedModel.findAll({
            where: {
                visited_date: {
                    [Op.between]: [initialDate, finalDate]
                }
            }
        });

        res.status(200).send({
            ok: true,
            links: linksVisited
        });
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        });
    }

};

/**
 * Handles the retrieval of all visited links with associated user and link details.
 *
 * This function queries the database to fetch all records from the LinksVisitedModel,
 * including related data from the UsersModel (excluding sensitive fields such as the password)
 * and the LinksModel. It sends the retrieved data as a response.
 *
 * @async
 * @function indexLinksVisitedControllerAllGet
 * @param {Object} req - Express request object containing details about the HTTP request.
 * @param {Object} res - Express response object used to send the HTTP response.
 * @throws Will return a 500 status code and error message in case of any server-side error.
 */
export const indexLinksVisitedControllerAllGet = async (req, res) => {
    try {

        const linksVisited = await LinksVisitedModel.findAll({
            include: [
                {
                    model: UsersModel,
                    attributes: {exclude: ['password']}
                },
                {model: LinksModel}
            ]
        });

        res.status(200).send({
            ok: true,
            linksVisited: linksVisited
        });

    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        });
    }
};


/**
 * Retrieves a specific visited link record by its ID.
 *
 * @function linksVisitedControllerGetID
 * @async
 * @param {Object} req - The request object.
 * @param {Object} req.params - The parameters in the request object.
 * @param {string} req.params.id - The ID of the visited link to retrieve.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends a JSON response with the retrieved visited link data if found, or an appropriate error message.
 *
 * @throws {Error} Sends a 500 status code and error message if an unexpected error occurs during database interaction.
 *
 * @description Handles the retrieval of a visited link record by querying the database using the given ID from the request parameters. If the record is found, it responds with the data; otherwise, returns a 404 error.
 */
export const linksVisitedControllerGetID = async (req, res) => {

    try {
        const LinksVisited = await LinksVisitedModel.findOne({
            where: {
                id_links_visited: req.params.id
            }
        });

        if (LinksVisited) {
            res.status(200).send({
                ok: true,
                linksVisited: LinksVisited
            });
        } else {
            res.status(404).send({
                ok: false,
                error: "Visited link not found with this id"
            });
        }
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        });
    }
};


/**
 * Handles a GET request to retrieve details about a specific link that was visited, including related user and link information.
 *
 * The function searches the database for a matching record in the `LinksVisited` table based on the provided `id_links` parameter.
 * If the record is found, it includes associated data from the `UsersModel` (excluding the `password` field) and the `LinksModel`.
 * If no record is found, a 404 error response is sent.
 * In case of a server error during the process, a 500 error response is returned.
 *
 * @param {Object} req - The request object containing client request data.
 * @param {Object} req.params - The route parameters of the request.
 * @param {string} req.params.id - The ID of the visited link to retrieve.
 * @param {Object} res - The response object used to send responses to the client.
 */
export const linksVisitedControllerGetIDAll = async (req, res) => {

    try {
        const LinksVisited = await LinksVisitedModel.findOne({
            where: {
                id_links: req.params.id
            },
            include: [
                {
                    model: UsersModel,
                    attributes: {exclude: ['password']}
                },
                {model: LinksModel}
            ]
        });

        if (LinksVisited) {
            res.status(200).send({
                ok: true,
                linksVisited: LinksVisited
            });
        } else {
            res.status(404).send({
                ok: false,
                error: "Visited link not found with this id"
            });
        }
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        });
    }
};

/**
 * Handles GET requests to retrieve links visited information based on a dynamic attribute and its value.
 *
 * @async
 * @function linksVisitedControllerGetParams
 * @param {Object} req - The request object containing parameters for filtering the database query.
 * @param {Object} req.params - The route parameters.
 * @param {string} req.params.attribute - The name of the database attribute to query.
 * @param {string} req.params.data - The value of the database attribute to match.
 * @param {Object} res - The response object used to send the result back to the client.
 * @returns {Promise<void>} Sends a JSON response with the query result or an error message.
 * @throws Will send a 500 status code if there is a server-side error during the query execution.
 */
export const linksVisitedControllerGetParams = async (req, res) => {

    const attribute = req.params.attribute;
    const data = req.params.data;

    try {
        const LinksVisited = await LinksVisitedModel.findAll({
            where: {
                [attribute]: data
            }
        });

        if (LinksVisited) {
            res.status(200).send({
                ok: true,
                linksVisited: LinksVisited
            });
        } else {
            res.status(404).send({
                ok: false,
                error: "Link visited not found with this " + attribute + ": " + data
            });
        }
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        });
    }
};


/**
 * Handles the retrieval of all records from the LinksVisitedModel based on a specific attribute and value.
 * This function queries the database for links visited that match the provided attribute and data,
 * including related user and link information, while excluding sensitive details like user passwords.
 *
 * @async
 * @function linksVisitedControllerGetParamsAll
 * @param {Object} req - The request object from the client.
 * @param {Object} req.params - Parameters in the request URL.
 * @param {string} req.params.attribute - The attribute name to filter the database query.
 * @param {string} req.params.data - The value of the attribute to match in the database query.
 * @param {Object} res - The response object to send back to the client.
 * @returns {void} Sends a JSON response to the client.
 * - If data is found, responds with `{ ok: true, linksVisited: [...] }` and HTTP status 200.
 * - If no data is found, responds with `{ ok: false, error: "..." }` and HTTP status 404.
 * - If an error occurs during processing, responds with `{ ok: false, error: "..." }` and HTTP status 500.
 */
export const linksVisitedControllerGetParamsAll = async (req, res) => {

    const attribute = req.params.attribute;
    const data = req.params.data;

    try {
        const LinksVisited = await LinksVisitedModel.findAll({
            where: {
                [attribute]: data
            },
            include: [
                {
                    model: UsersModel,
                    attributes: {exclude: ['password']}
                },
                {model: LinksModel}
            ]
        });
        if (LinksVisited) {
            res.status(200).send({
                ok: true,
                linksVisited: LinksVisited
            });
        } else {
            res.status(404).send({
                ok: false,
                error: "Link visited not found with this " + attribute + ": " + data
            });
        }
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        });
    }
};

// Count visited links by user
/**
 * Handles the request to retrieve the count of links visited by a specific user.
 *
 * This function extracts the `id_user` parameter from the request, queries
 * the LinksVisitedModel to count the number of records matching the provided user ID,
 * and sends the result or an error response as appropriate.
 *
 * @async
 * @function linkVisitedControllerGetCount
 * @param {Object} req - The request object containing parameters and other data.
 * @param {Object} res - The response object used to send data back to the client.
 * @throws {Error} Returns a 500 status code along with the error message in case of a failure.
 */
export const linkVisitedControllerGetCount = async (req, res) => {
    try {
        // Extrae el id_user de los parámetros de la petición
        const { id_user } = req.params;

        // Cuenta el número de registros que coinciden con el id_user
        const count = await LinksVisitedModel.count({
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

// Count all visited links
/**
 * Handles the retrieval of the total count of links visited from the database.
 *
 * This function sends a response containing the total count of links visited, retrieved from the database.
 * In case of an error during the execution, it responds with an appropriate error message.
 *
 * @async
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @throws {Error} If an error occurs during the database query, it sends a response with a status of 500 and error details.
 */
export const linkVisitedControllerGetCountAll = async (req, res) => {
    try {

        // Cuenta el número de registros que coinciden con el id_user
        const count = await LinksVisitedModel.count();

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

/**
 * Handles the retrieval of all links visited by a specific user.
 *
 * @function linksVisitedControllerGetByUserId
 * @async
 * @param {Object} req - The request object containing necessary data.
 * @param {Object} req.params - Contains route parameters.
 * @param {string} req.params.id_user - The unique identifier of the user whose visited links are being retrieved.
 * @param {Object} res - The response object used to send back the results.
 * @returns {undefined} Sends a response with the status and either the list of links visited or an error message.
 * @throws {Error} Returns a status code of 500 and the error message if any unexpected error occurs.
 */
export const linksVisitedControllerGetByUserId = async (req, res) => {
    try {
        const { id_user } = req.params;

        const linksVisited = await LinksVisitedModel.findAll({
            where: {
                id_user: req.params.id_user
            }
        });

        res.status(200).send({
            ok: true,
            linksVisited
        });
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        });
    }
};
