/* eslint-disable consistent-return */
const express = require('express');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const router = express.Router();

const { adminMiddleware } = require('../validators/auth');
const Auth = require('../helpers/authenticated');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${shortid.generate()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/create', Auth.IsAuthorized, adminMiddleware, upload.array('productPictures'));
// router.get('/all');

module.exports = router;
