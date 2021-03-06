const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const User = require('../user/user.model');
// sample user, used for authentication
/*const user = {
  username: 'react',
  password: 'express'
};*/

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  User.findOne({ mail: req.body.mail, password: req.body.password }, (err, user) => {
    if (err) {
      return next(new APIError('Authentication error', httpStatus.UNAUTHORIZED, true));
    }
    const token = jwt.sign({ mail: user.mail }, config.jwtSecret);
    return res.json({ token, username: user.username });
  });
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

module.exports = { login, getRandomNumber };
