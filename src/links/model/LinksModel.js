import { sequelizeDatabase } from "../../../database.js";
import { DataTypes } from "sequelize";

/**
 * Represents the `LinksModel` database model.
 * This model is used to define the structure of the `links` table in the database,
 * including its fields, constraints, and associations. It utilizes Sequelize
 * for ORM functionality.
 *
 * Features:
 * - Includes fields for `id_links`, `original_link`, `short_link`, `registration_date_links`, and `id_user`.
 * - Configures primary keys, foreign keys, and field-level constraints.
 * - Disables automatic management of `createdAt` and `updatedAt` fields.
 * - Defines a unique index on the `short_link` field to ensure uniqueness.
 * - Creates a foreign key relationship with the `users` table via the `id_user` field.
 *
 * Additional Configurations:
 * - The `tableName` is explicitly set to `"links"`.
 * - Indexing is applied to optimize queries and enforce unique constraints.
 */
export const LinksModel = sequelizeDatabase.define("links", {
    /**
     * Represents the schema definition for the `id_links` field in a database model.
     * This field is of type INTEGER, auto-increments, and serves as the primary key.
     *
     * Properties:
     * - `type`: Specifies the data type of the field as INTEGER.
     * - `autoIncrement`: Indicates that the value of this field will automatically increment.
     * - `primaryKey`: Marks this field as the primary key for the model.
     */
    id_links: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    /**
     * Represents the original link associated with an entity.
     * This property stores a string with a maximum length of 2048 characters.
     * It is a required field and cannot be null.
     */
    original_link: {
        type: DataTypes.STRING(2048),
        allowNull: false,
    },
    /**
     * Represents a short link attribute in the database model.
     * It is a string with a maximum length of 4 characters.
     * This field is mandatory and cannot be null.
     */
    short_link: {
        type: DataTypes.STRING(4),
        allowNull: false
    },
    /**
     * Represents the registration date of links in the database.
     *
     * @property {DataTypes.DATE} type - Defines the data type as DATE.
     * @property {DataTypes.NOW} defaultValue - Sets the default value to the current date and time.
     * @property {boolean} allowNull - Indicates whether the field can be null. Set to false.
     */
    registration_date_links: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    /**
     * Represents a foreign key relationship to the "users" table, linking to the "id_user" column.
     *
     * @type {Object}
     * @property {DataTypes.INTEGER} type - The data type of the field, set to INTEGER.
     * @property {boolean} allowNull - Indicates whether the field allows NULL values. Set to false.
     * @property {Object} references - Defines the table and column being referenced for the foreign key.
     * @property {string} references.model - The name of the referenced table. In this case, "users".
     * @property {string} references.key - The name of the referenced column. In this case, "id_user".
     * @property {string} onUpdate - Describes the behavior of the foreign key on updates. Set to "CASCADE".
     * @property {string} onDelete - Describes the behavior of the foreign key on deletions. Set to "CASCADE".
     */
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users", // Refencerenced table
            key: "id_user"  // Referenced column
        },
        onUpdate: "CASCADE", // Optional: behavior on update
        onDelete: "CASCADE" // Optional: behavior on delete
    },
}, {
    /**
     * Represents the name of the database table.
     */
    tableName: "links", // Specify the table name explicitly
    /**
     * Disables the automatic addition of `createdAt` and `updatedAt` timestamp fields
     * to the model. Setting this to `false` prevents Sequelize from managing these
     * timestamps for the respective model.
     */
    timestamps: false, // Disable automatic addition of createdAt and updatedAt fields
    /**
     * The `indexes` property defines database indexes for the associated table.
     * This configuration is used to optimize queries and enforce constraints.
     *
     * - `name`: Specifies the name of the index.
     * - `unique`: Indicates whether the index enforces uniqueness for the indexed column(s).
     * - `fields`: An array of column names to include in the index.
     *
     * In this case:
     * - `name` is 'idx_short_link', defining the name of the index.
     * - `unique` is set to `true`, ensuring values in the 'short_link' column are unique.
     * - `fields` contains 'short_link', indicating the column to be indexed.
     */
    indexes: [
        {
            // Create an index on the short_link column
            name: 'idx_short_link', // Index name
            unique: true,
            fields: ['short_link'] // Column to index
        }
    ]
});
