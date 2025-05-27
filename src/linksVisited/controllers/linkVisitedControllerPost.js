// Create a new visited link
import {LinksVisitedModel, LinksModel, UsersModel} from "../../models/model.js";
import {isValidIp} from "../../helpers/ipVerification.js";

/**
 * Handles the creation of a record for a visited link in the database.
 * Validates input data, checks the existence of both the user and the link,
 * and associates the visit metadata such as OS, web navigator, IP address, country, and city.
 *
 * @async
 * @function linkVisitedControllerCreate
 * @param {Object} req - Express request object containing the visitor information in the body.
 * @param {Object} res - Express response object used to send the status and data or error messages.
 * @throws Will return a 400 HTTP response if validation fails for the id_user or id_links fields or if the respective user or link does not exist.
 * @throws Will return a 500 HTTP response if an internal server error occurs.
 */
export const linkVisitedControllerCreate = async (req, res) => {

    try {
        const {so, web_navigator, ip, country, city, id_user, id_links} = req.body;

        //ip address validation
        const ipValidation = isValidIp(ip) ? ip : null;

        // User validation not null
        if (!id_user) {
            return res.status(400).send({
                ok: false,
                error: "id_user is required"
            });
        }

        // Check if the user exists
        const user = await UsersModel.findOne({
            where: {
                id_user: id_user
            }
        });

        if(!user){
            return res.status(400).send({
                ok: false,
                error: "User does not exist"
            });
        }

        // Link validation not null
        if (!id_links) {
            return res.status(400).send({
                ok: false,
                error: "id_links is required"
            });
        }

        // Check if the link exists
        const links = await LinksModel.findOne({
            where: {
                id_links: id_links
            }
        });

        if(!links){
            return res.status(400).send({
                ok: false,
                error: "Link does not exist"
            });
        }

        // Create a new visited link
        const linkVisited = await LinksVisitedModel.create({
            so, web_navigator, ip: ipValidation, country, city, id_user, id_links
        });
        res.status(201).send({
            ok: true,
            linkVisited: linkVisited,
            message: "New visited link created"
        });


    } catch (error) {
        // Send the error message
        res.status(500).send({
            ok: false,
            error: error.message
        });
    }
};
