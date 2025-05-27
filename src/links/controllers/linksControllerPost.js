import {LinksModel} from "../../models/model.js";
import {generateShortLink} from "../../helpers/generateShortLink.js";
import validator from 'validator'

/**
 * Asynchronous function to create a new shortened link for a user.
 *
 * This function validates the provided original link and user ID, checks if the
 * link already exists under the same user, and generates a unique short link.
 * If the link does not exist, it creates a new entry in the database.
 *
 * @async
 * @function
 * @param {Object} req - The request object from the client.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.original_link - The original URL to be shortened.
 * @param {number} req.body.id_user - The ID of the user creating the shortened link.
 * @param {Object} res - The response object to send the result back to the client.
 * @returns {void} Sends an appropriate HTTP response status and message.
 *
 * @throws {Error} Returns a 400 status if the link is invalid, a user ID is not provided,
 * or if the link already exists for the user. Returns a 500 status for internal server errors.
 */
export const linkControllerCreate = async (req, res) => {

    try {
        const {original_link, id_user} = req.body;

        // Check if the link is valid
        if (!original_link || typeof original_link !== 'string' || !validator.isURL(original_link.trim())){
            return res.status(400).send({
                ok: false,
                error: "Invalid URL"
            });
        }

        // Check if the link already exists
        const existsLink = await LinksModel.findOne({
            where: {
                original_link: original_link,
                id_user: id_user
            }
        });

        // If the link already exists, send an error message
        if (existsLink) {
            return res.status(400).send({
                ok: false,
                error: "Link already exists for this user"
            });
        }

        if(id_user === undefined || id_user === null){
            return res.status(400).send({
                ok: false,
                error: "User ID is required"
            });
        }

        //create short_link
        let short_link = generateShortLink();

        // Check if the short_link already exists
        const existsShortLink = await LinksModel.findOne({
            where: {
                short_link: short_link
            }
        });

        // If the link already exists, send an error message
        if (existsShortLink) {

            short_link = generateShortLink();
        }

        // Create a new link
        const newLink = await LinksModel.create({
            original_link, short_link, id_user
        });
        res.status(201).send({
            ok: true,
            link: newLink,
            message: "New short link created"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            ok: false,
            error: "Internal server error"
        });
    }

}
