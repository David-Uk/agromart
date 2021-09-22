/* eslint-disable no-underscore-dangle */
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const Auth = require('../helpers/authenticated');
const UserController = require('../controllers/userController');

dotenv.config();

const { SECRET } = process.env;

const router = express.Router();
const User = require('../models/user');

router.post('/signup', UserController.Signup);

router.post('/signin', UserController.Signin);

router.put('/edit/:id', Auth.IsAuthorized, UserController.Edit);
module.exports = router;
