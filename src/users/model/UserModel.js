import { DataTypes, Sequelize } from "sequelize";

import { sequelizeDatabase } from "../../../database.js";

/**
 * Represents the model definition for the "users" table in the database.
 * This model is designed to handle user-related data and includes fields for
 * user identification, authentication, personal information, and roles.
 *
 * Table Properties:
 * - `id_user`: An integer serving as the primary key for the table, with auto-increment functionality.
 * - `email`: A string representing the user's email address. This field is unique and mandatory, formatted as a valid email.
 * - `password`: A string storing the user's password, which must be at least 8 characters long.
 * - `name`: A string representing the user's name, with a minimum length requirement of 3 characters.
 * - `r_date`: A date indicating the user's registration date. The default value is the current date and time.
 * - `b_date`: An optional date field representing the user's birthdate.
 * - `role`: A string field indicating the user's role. Defaults to "user" and has a maximum length of 10 characters.
 *
 * Model Configuration:
 * - Table Name: Explicitly set to "users".
 * - Automatic Timestamps: Disabled, omitting the `createdAt` and `updatedAt` fields.
 */
export const UsersModel = sequelizeDatabase.define("users", {
    /**
     * Represents the unique identifier for a user in the database.
     *
     * @type {object}
     * @property {number} type - The data type of the identifier.
     * @property {boolean} autoIncrement - Indicates whether the identifier value will auto-increment.
     * @property {boolean} primaryKey - Specifies if the identifier is the primary key for the table.
     */
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    /**
     * Represents the 'email' field in the database model.
     * This field stores an email address as a string with a maximum length of 50 characters.
     * The field cannot be null and must contain a unique value.
     * Validation is performed to ensure the value is a valid email address.
     */
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        isEmail: true,
    },
    /**
     * Represents the password field configuration for a database model.
     *
     * Properties:
     * - type: Defines the data type as a string with a maximum length of 255 characters.
     * - allowNull: Specifies that this field cannot contain null values.
     * - min: Enforces a minimum length of 8 characters for the password.
     */
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        min: 8,
    },
    /**
     * Represents the 'name' field in the model schema.
     * This field is a string with a maximum length of 50 characters.
     * It is a mandatory field and cannot be null.
     * The minimum length for this string is 3 characters.
     */
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        min: 3
    },
    /**
     * Represents a date field in the database.
     * - Utilizes the DataTypes.DATE type.
     * - Cannot have null values.
     * - Defaults to the current date and time using Sequelize.NOW.
     */
    r_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    /**
     * Represents the birth date or a date value.
     *
     * @type {DataTypes.DATE}
     * @property {boolean} allowNull - Specifies whether the date value can be null.
     */
    b_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    /**
     * Defines the `role` property of a model.
     *
     * This property specifies the role assigned to a user or entity.
     * It is a string with a maximum length of 10 characters.
     *
     * Properties:
     * - `type`: The data type of the property, which is a string with a maximum length of 10.
     * - `allowNull`: Indicates that the property cannot be null.
     * - `defaultValue`: Sets the default value of the property to "user".
     */
    role: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "user"
    },
}, {
    /**
     * Represents the name of the database table used for storing user records.
     * This property specifies the table name as 'users'.
     */
    tableName: "users", // Specify the table name explicitly
    /**
     * Specifies whether the model should include timestamp fields (`createdAt` and `updatedAt`).
     * When set to `false`, these fields will not be automatically added or maintained by the model.
     */
    timestamps: false, // Disable automatic addition of createdAt and updatedAt fields
});
