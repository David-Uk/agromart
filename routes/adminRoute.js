/* eslint-disable no-underscore-dangle */
const express = require('express');
const dotenv = require('dotenv');

const Auth = require('../helpers/authenticated');
const AdminController = require('../controllers/adminController');

dotenv.config();

const router = express.Router();

router.post('/signup', AdminController.Signup);

router.post('/signin', AdminController.Signin);

router.put('/edit/:id', Auth.IsAuthorized, AdminController.Edit);

module.exports = router;
