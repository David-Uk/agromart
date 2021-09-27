/* eslint-disable no-underscore-dangle */
const express = require('express');
const dotenv = require('dotenv');

const Auth = require('../helpers/authenticated');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');
const UserController = require('../controllers/userController');

dotenv.config();

const router = express.Router();

router.post('/signup', validateSignupRequest, isRequestValidated, UserController.Signup);

router.post('/signin', validateSigninRequest, isRequestValidated, UserController.Signin);

router.put('/edit/:id', Auth.IsAuthorized, isRequestValidated, UserController.Edit);

router.delete('/delete/:id', Auth.IsAuthorized, isRequestValidated, UserController.Delete);

module.exports = router;
