import {LinksVisitedModel} from "../../models/model.js";


/**
 * Handles the deletion of a specific link visited entry by its ID.
 *
 * This asynchronous function attempts to find and delete a link visited record
 * from the database based on the provided ID in the request parameters. If the ID
 * is not a valid number, a 400 HTTP status is returned. If the link visited entry
 * is successfully found and deleted, a success response is sent. Otherwise, a
 * 404 HTTP status is returned if no entry is found with the given ID.
 *
 * In the event of a server error, a 500 HTTP status is returned along with the
 * error message.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.params - The parameters in the request.
 * @param {string} req.params.id - The unique ID of the link visited entry to delete.
 * @param {Object} res - The HTTP response object used to send the response.
 *
 * @throws Will return a 400 HTTP status if the ID is not a number.
 * @throws Will return a 404 HTTP status if an entry with the supplied ID does not exist.
 * @throws Will return a 500 HTTP status if a server error occurs.
 */
//delete link visited by ID
export const linkVisitedControllerDeleteID = async (req, res) => {
    try {

        const { id } = req.params;

        if(isNaN(Number(id))) {
            return res.status(400).send({
                ok: false,
                error: "ID has to be a number"
            });
        }

        const linkVisited = await LinksVisitedModel.findOne({
            where: {
                id_links_visited: id
            }
        });

        if (linkVisited) {
            await linkVisited.destroy();
            res.send({
                ok: true,
                user: linkVisited,
                message: "Link visited deleted"
            });
        } else {
            res.status(404).send({
                ok: false,
                error: "Link visited not found with id " + id
            });
        }
    } catch (error) {
        res.status(500).send({
            ok: false,
            error: error.message
        });
    }
}
