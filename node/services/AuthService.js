/* eslint-disable camelcase */
require('dotenv').config();
const ErrorResponse = require('../shared/error');

/**
 * Service Layer for auth route
 */
class AuthService {
  constructor (joi, models, jwt, config, bcrypt) {
    this.joi = joi;
    this.models = models;
    this.config = config;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
  }

  // Check if all the required information are included in the request body
  validateAuthQuery = (req, res, next) => {
  	const { body } = req;
  	const schema = this.joi.object().keys({
      email: this.joi.string().required(),
  		password: this.joi.required(),
  	});
  	const result = this.joi.validate(body, schema);
  	const { error } = result;
  	const valid = error == null;
  	if (valid) {
  		next();
  	} else {
  		res.status(400).json(ErrorResponse('Validation Error', 'Incorrect / Missing value in request query', 400));
  	}
  }

  // Sign up the user and store account details in psql
  // Check if email exists in the database table, return error it does
  // hash the password with bcrypt for security
  // return jwt token for request to /api/stock & /api/order
  signUp = async (req) => {
    try {
      const { email, password } = req.body;
      const { accounts } = this.models;
      const hashedPassword = await this.bcrypt.hash(password, Number(process.env.BCRYPT_HASH));
      const [accountDetails, newlyCreated] = await accounts.findOrCreate(
        {
          where: {
            email
          },
          defaults: {
            password: hashedPassword
          }
        },
      );

      if (!newlyCreated) {
        throw ErrorResponse('Sign Up Error', 'Email is already created', 400);
      }

      const payload = {
        id: accountDetails.id,
        email: accountDetails.email,
        createdAt: accountDetails.createdAt
      };
      const token = await this.jwt.sign(payload, this.config.jwtSecret, { expiresIn: '30m' });
      return token;
    } catch (err) {
      const { type, description, code } = err;
      throw ErrorResponse(type, description, code);
    }
  }

  // Sign up the user and store account details in psql
  // Check if email exists in the database table, return error it does not
  // compare the plain password with the hashed password in the database with bcrypt
  // saltRound is stored in the .env file for security
  // return jwt token for request to /api/stock & /api/order
  logIn = async (req) => {
    try {
      const { email, password } = req.body;
      const { accounts } = this.models;
      const account = await accounts.findOne(
        {
          where: {
            email
          },
        },
      );

      if (!account) {
        throw ErrorResponse('Log In Error', 'Incorrect Email or Password', 400);
      }

      const isPasswordCorrect = await this.bcrypt.compare(password, account.password);

      if (!isPasswordCorrect) {
        throw ErrorResponse('Log In Error', 'Incorrect Email or Password', 400);
      }

      const payload = {
        id: account.id,
        email: account.email,
        createdAt: account.createdAt
      };
      const token = this.jwt.sign(payload, this.config.jwtSecret, { expiresIn: '30m' });
      return token;
    } catch (err) {
      const { type, description, code } = err;
      throw ErrorResponse(type, description, code);
    }
  }
}

module.exports = AuthService;
