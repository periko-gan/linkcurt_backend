//The order of imports is important because of the foreign keys
import { UsersModel } from "../users/model/UserModel.js";
import { LinksModel } from "../links/model/LinksModel.js";
import { LinksVisitedModel } from "../linksVisited/model/LinksVisitedModel.js";

import { sequelizeDatabase } from '../../database.js';

// Define associations
LinksModel.belongsTo(UsersModel, { foreignKey: 'id_user' });
UsersModel.hasMany(LinksModel, { foreignKey: 'id_user' });

LinksVisitedModel.belongsTo(UsersModel, { foreignKey: 'id_user' });
UsersModel.hasMany(LinksVisitedModel, { foreignKey: 'id_user' });

LinksVisitedModel.belongsTo(LinksModel, { foreignKey: 'id_links' });
LinksModel.hasMany(LinksVisitedModel, { foreignKey: 'id_links' });



/**
 * Synchronizes all defined models with the connected database.
 * This method ensures the database schema matches the models' definitions,
 * using the `alter` option to update existing tables without losing data.
 * Logs a success message upon completion or an error message if synchronization fails.
 *
 * @return {Promise<void>} A promise that resolves when the synchronization process is complete.
 */
export async function syncModels() {
    try {
// Synchronize all defined models
// Use alter to update existing tables without losing data
        await sequelizeDatabase.sync({ alter: true });
        console.log('Models synchronized with the MySQL database.');
    } catch (error) {
        console.error('Error synchronizing models:', error);
    }
}

export { UsersModel, LinksModel, LinksVisitedModel };
