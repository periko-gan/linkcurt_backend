import {LinksModel} from "../../models/model.js";


/**
 * Handles the deletion of a link resource based on the provided ID.
 * Validates the ID parameter from the request and attempts to find and delete the corresponding link record.
 *
 * If the ID is not a valid number, a 400 Bad Request response is returned.
 * If no link is found with the given ID, a 404 Not Found response is returned.
 * If the link is successfully deleted, a success response is returned with the deleted link details.
 * In case of a server error, a 500 Internal Server Error response is returned.
 *
 * @param {Object} req - The request object containing parameters and other request data.
 * @param {Object} req.params - The parameters from the request.
 * @param {string|number} req.params.id - The ID of the link to be deleted.
 * @param {Object} res - The response object used to send back the result.
 * @returns {Promise<void>} Returns a response containing the success or error message.
 */
//Delete link by ID
export const linkControllerDeleteID = async (req, res) => {
    try {

        const { id } = req.params;

        if(isNaN(Number(id))) {
            return res.status(400).send({
                ok: false,
                error: "ID has to be a number"
            });
        }

        const link = await LinksModel.findOne({
            where: {
                id_links: req.params.id
            }
        });

        if (link) {
            await link.destroy();
            res.send({
                ok: true,
                links: link,
                message: "Link deleted"
            });
        } else {
            res.status(404).send({
                ok: false,
                error: "Link not found with id " + req.params.id
            });
        }
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        });
    }
}
