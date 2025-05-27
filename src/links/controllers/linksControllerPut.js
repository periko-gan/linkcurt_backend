import validator from 'validator';

import {LinksModel} from '../../models/model.js';

/**
 * Handles updating an existing link by its ID.
 *
 * This asynchronous function retrieves the `id_links` and `original_link` values
 * from the request body, validates the provided `original_link`, and updates the record
 * in the database corresponding to the specified `id_links`. The function sends
 * appropriate HTTP responses based on the success, failure, or potential errors encountered
 * during the process.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The body of the HTTP request.
 * @param {string} req.body.id_links - The ID of the link to be updated in the database.
 * @param {string} req.body.original_link - The new URL to update the link with.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Promise<void>} Sends an HTTP response with a status code and message indicating the outcome:
 * - `200 OK`: Successfully updated the link.
 * - `400 Bad Request`: Invalid or missing URL.
 * - `404 Not Found`: No link found with the given ID.
 * - `500 Internal Server Error`: Failure due to a server error.
 */
export const linkControllerPutID = async (req, res) => {

    let {id_links, original_link} = req.body;

    // Check if the link is valid
    // if (!original_link || typeof original_link !== 'string' || !urlVerification(original_link.trim())){
    if (!original_link || typeof original_link !== 'string' || !validator.isURL(original_link.trim())){
        return res.status(400).send({
            ok: false,
            error: "Invalid URL"
        });
    }

    try {
        const link = await LinksModel.findOne({
            where: {
                id_links: id_links
            }
        });

        if (link) {
            await link.update(
                {
                    original_link: original_link
                }
            );
            res.status(200).send({
                ok: true,
                link: link,
                message: "Link updated"
            });
        } else {
            res.status(404).send({
                ok: false,
                error: "Link not found with this id:" + req.params.id
            });
        }
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        });
    }
}
