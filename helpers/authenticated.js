/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

class Auth {
  static async IsAuthorized(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
      return res.status(403).send('A token is required for authentication');
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send('Invalid Token');
    }
    return next();
  }
}

module.exports = Auth;
