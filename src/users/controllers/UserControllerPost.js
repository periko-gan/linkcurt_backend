import validator from 'validator'

import { UsersModel } from '../../models/model.js'

import bcrypt from 'bcryptjs'

import { generateToken } from '../../middleware/createJWT.js'

/**
 * Handles the creation of a new user.
 *
 * This function validates user input, checks for existing users, hashes the password, and creates
 * a new user record in the database. It responds with appropriate status codes and messages based on the outcomes.
 *
 * @async
 * @function userControllerCreate
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The input data for user creation, including email, password, name, and birth date.
 * @param {string} req.body.email - The email of the user to be created.
 * @param {string} req.body.password - The password of the user to be created.
 * @param {string} req.body.name - The name of the user to be created.
 * @param {string} req.body.b_date - The birth date of the user to be created.
 * @param {Object} res - The HTTP response object.
 *
 * @throws {Error} If an internal server error occurs during the execution.
 *
 * @description
 * - Validates the email format to ensure it adheres to standard email format requirements.
 * - Ensures the user's provided name has more than 3 characters.
 * - Checks if the user already exists by their email in the database.
 * - Hashes the provided password using bcrypt for secure storage.
 * - Validates the password to ensure it has at least 8 characters.
 * - Creates a new user in the database with the provided details, including a default role of "user".
 * - Generates and returns a token upon successful creation of the user.
 * - Responds with appropriate status codes based on validation failures or errors.
 */
export const userControllerCreate = async (req, res) => {

  try {
    const { email, password, name, b_date } = req.body

    // Check if the email is valid
    if (!validator.isEmail(email)) {
      res.status(400).send({
        ok: false,
        error: 'Invalid email format'
      })
      return
    }

    // Check the name length
    if (name.length <= 3) {
      return res.status(400).send({
        ok: false,
        error: 'Name must have more than 3 characters'
      })
    }

    // Check if the user already exists by email or name
    const existsUser = await UsersModel.findOne({
      where: {
        email: email,
      },
      attributes: { exclude: ['password'] }
    })

    // If the user already exists, send an error message
    if (existsUser) {
      // Check if the email already exists
      if (existsUser.email === email) {
        return res.status(400).send({
          ok: false,
          error: 'Email already exists'
        })
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Check if the password has at least 8 characters
    if (req.body.password.length < 8) {
      res.status(400).send({
        ok: false, error: 'The password must have at least 8 characters'
      })
    } else {

      // Create a new user
      const newUser = await UsersModel.create({
        email, password: hashedPassword, name, b_date, role: 'user'
      })
      res.status(201).send({
        ok: true,
        token: generateToken(email),
        user: newUser,
        message: 'New user created'
      })
    }

  } catch (error) {
    // Send the error message
    res.status(500).send({
      ok: false,
      error: error.message
    })
  }
}
