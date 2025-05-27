import { sequelizeDatabase } from "../../../database.js";
import { DataTypes, Sequelize } from "sequelize";

/**
 * Represents the LinksVisitedModel database model that is used to track the links visited by users.
 *
 * This model defines the schema for the "links_visited" table in the database. It stores information
 * regarding the visited links, including metadata like the visiting user's details, link details,
 * date of visit, and the user's browser and geographic data.
 *
 * The fields in this model include:
 * - id_links_visited: The primary key for the table, auto-incremented integer.
 * - visited_date: The date and time when the link was visited. Defaults to the current timestamp.
 * - so: A string indicating the operating system of the user. Optional field.
 * - web_navigator: A string indicating the web browser used by the user. Optional field.
 * - ip: A string storing the IP address of the user. Optional field.
 * - country: A string specifying the country of the user. Optional field.
 * - city: A string specifying the city of the user. Optional field.
 * - id_user: A foreign key referencing the 'id_user' column in the "users" table. It cascades on update and delete.
 * - id_links: A foreign key referencing the 'id_links' column in the "links" table. It cascades on update and delete.
 *
 * The model explicitly names the associated database table as "links_visited" and disables
 * automatic timestamp management for createdAt and updatedAt fields.
 */
export const LinksVisitedModel = sequelizeDatabase.define("LinksVisited", {
    /**
     * Represents the column definition for the `id_links_visited` field in the database schema.
     * Used as a unique identifier for the links visited table.
     *
     * Properties:
     * - type: Specifies the data type of the column as an integer.
     * - autoIncrement: Indicates that the value of this column will automatically increment with each new record.
     * - primaryKey: Defines this column as the primary key of the table.
     */
    id_links_visited: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    /**
     * Represents the date a visit occurred.
     *
     * This field is mandatory and is automatically set to the current date and time
     * if no value is provided. It utilizes the DATE data type.
     *
     * Properties:
     * - allowNull: Specifies whether null values are allowed. This is set to `false`.
     * - defaultValue: Defines the default value for this field. It is set to the current timestamp.
     */
    visited_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    /**
     * Defines the `so` property for a database model.
     *
     * Properties:
     * - `type`: Specifies the data type as a string with a maximum length of 100 characters.
     * - `allowNull`: Indicates whether this property can accept null values; true means null values are allowed.
     */
    so: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    /**
     * Represents the web browser or navigator information.
     *
     * This property is defined as a string with a maximum length of 100 characters.
     * It is optional and can have a null value.
     */
    web_navigator: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    /**
     * Represents the IP address field in the database model.
     *
     * This field is optional and can store IP addresses as strings
     * with a maximum length of 45 characters.
     */
    ip: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    /**
     * Represents the country field in the database model.
     *
     * The field is defined as a string with a maximum length of 50 characters.
     * It is optional, meaning that null values are allowed.
     */
    country: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    /**
     * Represents the `city` field in the model.
     * This field is a string with a maximum length of 100 characters.
     * It is optional and can allow null values.
     */
    city: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    /**
     * Represents a foreign key that references the `id_user` column in the `users` table.
     *
     * @property {DataTypes.INTEGER} type - Specifies the data type of the column as an integer.
     * @property {boolean} allowNull - Indicates that null values are not allowed for this column.
     * @property {Object} references - Defines the foreign key reference to another table.
     * @property {string} references.model - The name of the table being referenced.
     * @property {string} references.key - The column in the referenced table that this column is linked to.
     * @property {string} onUpdate - Specifies the behavior when the referenced value in the other table is updated (default: CASCADE).
     * @property {string} onDelete - Specifies the behavior when the referenced value in the other table is deleted (default: CASCADE).
     */
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users", // Referenced table
            key: "id_user"  // Referenced column
        },
        onUpdate: "CASCADE", // Optional: behavior on update
        onDelete: "CASCADE"  // Optional: behavior on delete
    },
    /**
     * Represents a foreign key field that establishes a relationship between the current table and the "links" table.
     *
     * @property {DataTypes.INTEGER} type - Specifies the data type of the field.
     * @property {boolean} allowNull - Indicates whether null values are allowed.
     * @property {Object} references - Defines the source of the foreign key relationship.
     * @property {string} references.model - The referenced table name.
     * @property {string} references.key - The referenced column in the table.
     * @property {string} onUpdate - Defines the behavior when the referenced field is updated.
     * @property {string} onDelete - Defines the behavior when the referenced field is deleted.
     */
    id_links: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "links", // Referenced table
            key: "id_links"  // Referenced column
        },
        onUpdate: "CASCADE", // Optional: behavior on update
        onDelete: "CASCADE"  // Optional: behavior on delete
    },

}, {
    /**
     * Specifies the name of the table in the database.
     */
    tableName: "links_visited", // Specify the table name explicitly
    /**
     * A configuration option to disable automatic timestamp generation in a database schema.
     * When set to `false`, it prevents the creation of `createdAt` and `updatedAt` fields.
     */
    timestamps: false // Disable automatic addition of createdAt and updatedAt fields
});
