/* eslint-disable no-underscore-dangle */
const express = require('express');
const dotenv = require('dotenv');

const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');
const Auth = require('../helpers/authenticated');
const AdminController = require('../controllers/adminController');

dotenv.config();

const router = express.Router();

router.post('/signup', validateSignupRequest, isRequestValidated, AdminController.Signup);

router.post('/signin', validateSigninRequest, isRequestValidated, AdminController.Signin);

router.put('/edit/:id', Auth.IsAuthorized, isRequestValidated, AdminController.Edit);

module.exports = router;
