/* eslint-disable consistent-return */
const { check } = require('express-validator');
const { validationResult } = require('express-validator');

exports.validateSignupRequest = [
  check('firstName')
    .notEmpty()
    .withMessage('firstName is required'),
  check('lastName')
    .notEmpty()
    .withMessage('lastName is required'),
  check('email')
    .isEmail()
    .withMessage('email is required'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

exports.validateSigninRequest = [
  check('email')
    .isEmail()
    .withMessage('email is required'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) return res.status(400).json({ errors: errors.array()[0].msg });
  next();
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== 'user') return res.status(400).json({ message: 'User Access Denied' });
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(400).json({ message: 'Admin Access Denied' });
  next();
};
