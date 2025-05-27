import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Sequelize instance used to connect to the MySQL database.
 *
 * This instance is configured using environment variables for database connection parameters:
 * - `DDBB_DATABASE`: The name of the database to connect to.
 * - `DDBB_USER`: The username for database authentication.
 * - `DDBB_PASSWORD`: The password for the specified database user.
 * - `DDBB_HOST`: The host where the database is located.
 * - `DDBB_PORT`: The port on which the database server is running.
 *
 * The `dialect` property is set to 'mysql', specifying that the database connection is using MySQL.
 *
 * @type {Sequelize}
 */
export const sequelizeDatabase = new Sequelize(
    process.env.DDBB_DATABASE,
    process.env.DDBB_USER,
    process.env.DDBB_PASSWORD,
    {
        host: process.env.DDBB_HOST,
        port: process.env.DDBB_PORT,
        dialect: 'mysql'
    }
);
