/* eslint-disable consistent-return */
const express = require('express');

const router = express.Router();

const CategoryController = require('../controllers/categoryController');
const { adminMiddleware } = require('../validators/auth');
const Auth = require('../helpers/authenticated');

router.post('/create', Auth.IsAuthorized, adminMiddleware, CategoryController.AddCategory);
router.get('/all', CategoryController.GetCategories);

module.exports = router;
